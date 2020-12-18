require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')

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
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: () => Book.find({}),
    allAuthors: () => Author.find({}),    
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

      return newBook
    },
    editAuthor: (root, args) => {
      updatedAuthor = authors.find(author => author.name === args.name)
      if(!updatedAuthor) {
        return null;
      } 
      updatedAuthor.born = args.setBornTo;
      authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
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