require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')

const Author = require('./models/author.js')
const Book = require('./models/book.js')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  },

  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
    }
  }  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})