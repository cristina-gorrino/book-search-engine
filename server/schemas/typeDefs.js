const {gql} = require('apollo-server-wxpress');

const typeDefs = gql `
type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
}

input savedBook {
    authors: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String

}

type Mutation {
    login (email: String!, password: String!) Auth:
    addUser (username: String! email: String! password: String!): Auth 
    saveBook: (input:savedBook): User
    removeBook (bookId): User
}
`
module.exports = typeDefs;