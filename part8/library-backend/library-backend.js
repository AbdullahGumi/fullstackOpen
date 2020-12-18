require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author.js')
const Book = require('./models/book.js')
const User = require('./models/user.js')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const typeDefs = gql`
  type Book {
    title: String!
    published: String!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  } 

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }  

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book!

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token  
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books
      if (!args.genre) {
        books = await Book.find({}).populate('author')
      }
      else {
        books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      books = books.map(book => ({
        ...book._doc,
        id: book._doc._id,
        author: {
          ...book._doc.author._doc,
          id: book._doc.author._doc._id,
          bookCount: Book.countDocuments({ author: book._doc.author._doc._id })
        }
      }))
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors.map(author => ({...author._doc, bookCount: Book.countDocuments({ author: author._id })}))
    },
    me: (root, args, { currentUser }) => currentUser   
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })
        try {
          await author.save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
      }
      const newBook = new Book({...args, author})
      try {
        await newBook.save()
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      newBook.author.bookCount = Book.countDocuments({ author: newBook.author._id })
      return newBook
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }      
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      author.bookCount = Book.countDocuments({ author: author.id })

      try {
          await author.save()
        } catch(e) {
          throw new UserInputError(e.message, {
            invalidArgs: args
          })
        }
       return author; 
    },
    createUser: async (root, args) => {
      const createdUser = new User({...args})
      try {
        await createdUser.save();
      } catch(e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        })
      }
      return createdUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '1234567890') {
        throw new UserInputError('Invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.NOT_SECRET_KEY) }      
    }
  }  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.NOT_SECRET_KEY)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})  