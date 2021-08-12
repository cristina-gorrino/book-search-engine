const {AuthenticationError} = require('apollo-server-express');
const {Book, User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        // Get a single user by id or username
        // TODO: find way to use OR, maybe just need the me query
        // user: async (parent, { username, id }) => {
        //     return User.findOne({ username }).populate('thoughts');
        // },

        // Find the current user
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('thoughts');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        // Create User
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },
          // Log in
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
            // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
            // user comes from `req.user` created in the auth middleware function
          saveBook: async (parent, args, context) => {

          },
          // Remove a book from saved books
          removeBook: async (parent, args, context) => {

        }
    }
}
module.exports = resolvers;