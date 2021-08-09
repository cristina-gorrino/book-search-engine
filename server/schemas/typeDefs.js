const {gql} = require('apollo-server-wxpress');

const typeDefs = gql `
type Book {
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


`
module.exports = typeDefs;