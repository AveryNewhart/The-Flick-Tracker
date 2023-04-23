const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { id }, { dataSources }, info) => {
      return await dataSources.User.findById(id);
    },
    users: async (_, __, { dataSources }) => {
      return await dataSources.User.find();
    },
    review: async (parent, { id }, { dataSources }, info) => {
      return await dataSources.Review.create(id);
    },
    reviews: (parent, args, { dataSources }, info) => {
      return dataSources.reviewAPI.getReviews();
    },
    comment: (parent, { id }, { dataSources }, info) => {
      return dataSources.commentAPI.getCommentById(id);
    },
    comments: (parent, args, { dataSources }, info) => {
      return dataSources.commentAPI.getComments();
    },
    reaction: (parent, { id }, { dataSources }, info) => {
      return dataSources.reactionAPI.getReactionById(id);
    },
    reactions: (parent, args, { dataSources }, info) => {
      return dataSources.reactionAPI.getReactions();
    },
    reply: (parent, { id }, { dataSources }, info) => {
      return dataSources.replyAPI.getReplyById(id);
    },
    replies: (parent, args, { dataSources }, info) => {
      return dataSources.replyAPI.getReplies();
    },
    movie: (parent, { id }, { dataSources }, info) => {
      return dataSources.movieAPI.getMovieById(id);
    },
    topRatedMovies: (parent, { limit }, { dataSources }, info) => {
      return dataSources.movieAPI.getTopRatedMovies(limit);
    },
    recommendedMovies: (parent, { watchedMovies }, { dataSources }, info) => {
      return dataSources.recommendationAPI.getRecommendations(watchedMovies);
    },
    recommendation: (parent, { id }, { dataSources }, info) => {
      return dataSources.recommendationAPI.getRecommendationById(id);
    },
    protected: (parent, args, context) => {
      console.log(context.headers)
      return "working"
    }

  },

  Mutation: {
    createUser: async (_, { input }, context) => {
      const newUser = await context.dataSources.User.create(input);
      const token = signToken(newUser)
      return { user:newUser, token };

    },
    loginUser: async (_, { email, password }, { dataSources }) => { //! Still has to do password validation
      const user = await dataSources.User.findOne({
          email
      })
      console.log(user)
      if(user._id) {
        const token = signToken(user)
        return { user, token }
      }
    },
  
  // updateUser: (parent, args, context, info) => {
  //   // Update the User object with the provided ID with the provided input
  //   // Return the updated User object
  // },
  // deleteUser: (parent, args, context, info) => {
  //   // Delete the User object with the provided ID
  //   // Return a boolean indicating whether the deletion was successful
  // },
  // addWatchedMovie: (parent, args, context, info) => {
  //   // Add a new Watched object to the User's watchedMovies array
  //   // Return the new Watched object
  // },
  // removeWatchedMovie: (parent, args, context, info) => {
  //   // Remove the Watched object with the provided movieId from the User's watchedMovies array
  //   // Return the removed Watched object
  // },
  // addMovieToWatchlist: (parent, args, context, info) => {
  //   // Add a new Watchlist object to the User's watchlist array
  //   // Return the new Watchlist object
  // },
  // removeMovieFromWatchlist: (parent, args, context, info) => {
  //   // Remove the Watchlist object with the provided movieId from the User's watchlist array
  //   // Return the removed Watchlist object
  // },
  addReview: async (_, { userId, movieId, text, rating }, { dataSources }) => {
    const input = { userId, movieId, text, rating }
    const newReview = await dataSources.Review.create(input)
    return newReview

    // Create a new Review object for the provided User and Movie objects with the provided input
    // Return the new Review object
  },
//   updateReview: (parent, args, context, info) => {
//     // Update the Review object with the provided ID with the provided input
//     // Return the updated Review object
//   },
//   deleteReview: (parent, args, context, info) => {
//     // Delete the Review object with the provided ID
//     // Return the deleted Review object
//   },
//   addReaction: (parent, args, context, info) => {
//     // Create a new Reaction object for the provided Review object with the provided input
//     // Return the new Reaction object
//   },
//   deleteReaction: (parent, args, context, info) => {
//     // Delete the Reaction object with the provided ID
//     // Return the deleted Reaction object
//   },
//   addComment: (parent, args, context, info) => {
//     // Create a new Comment object for the provided Review object with the provided input
//     // Return the new Comment object
//   },
//   updateComment: (parent, args, context, info) => {
//     // Update the Comment object with the provided ID with the provided input
//     // Return the updated Comment object
//   },
//   deleteComment: (parent, args, context, info) => {
//     // Delete the Comment object with the provided ID
//     // Return the deleted Comment object
//   },
//   addReply: (parent, args, context, info) => {
//     // Create a new Reply object for the provided Comment object with the provided input
//     // Return the new Reply object
//   },
//   updateReply: async (parent, { replyId, text }, { dataSources }, info) => {
//     // Check if reply exists
//     const existingReply = await dataSources.db.reply.findOne({
//       where: { id: replyId }
//     });
//     if (!existingReply) {
//       throw new Error("Reply not found");
//     }

//     // Update reply
//     const updatedReply = await dataSources.db.reply.update(
//       {
//         text
//       },
//       { where: { id: replyId } }
//     );

//     return updatedReply;
//   },

//   deleteReply: async (parent, { replyId }, { dataSources }, info) => {
//     // Check if reply exists
//     const existingReply = await dataSources.db.reply.findOne({
//       where: { id: replyId }
//     });
//     if (!existingReply) {
//       throw new Error("Reply not found");
//     }

//     // Delete reply
//     await dataSources.db.reply.destroy({ where: { id: replyId } });

//     return existingReply;
//   },
// }
},
}
module.exports = resolvers;