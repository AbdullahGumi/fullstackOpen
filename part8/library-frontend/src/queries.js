import { gql } from '@apollo/client';

export const CRAETE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{
        name
      }
      published
    }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!,  $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`
export const ALL_BOOKS_BY_GENRE = gql`
query allBooks($genre: String!){
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
    genres
  }
}
`
