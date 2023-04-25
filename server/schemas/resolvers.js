//!Makes sure the user must be logged in to post a review  //!Will add more models when we hash them out in queries and mutations

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Review, Movie, Comment, Reply, Reaction } = require("../models"); //we don't need to do the dataSource at all if we import all the models

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username });
    },
    //git pu users: async (_, __, context) => {
    //   return await User.find();
    // },
    //   review: async (parent, { id }, context) => {
    //     return await Review.create(id);
    //   },
    //   reviews: (parent, args, context) => {
    //     return reviewAPI.getReviews();
    //   },
    //   comment: (parent, { id }, context) => {
    //     return commentAPI.getCommentById(id);
    //   },
    //   comments: (parent, args, context) => {
    //     return commentAPI.getComments();
    //   },
    //   reaction: (parent, { id }, context) => {
    //     return reactionAPI.getReactionById(id);
    //   },
    //   reactions: (parent, args, context) => {
    //     return reactionAPI.getReactions();
    //   },
    //   reply: (parent, { id }, context) => {
    //     return replyAPI.getReplyById(id);
    //   },
    //   replies: (parent, args, context) => {
    //     return replyAPI.getReplies();
    //   },
    protected: async (parent, args, context) => {
      //!Query defined in typeDef for authentication
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(context.user);
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    // movie: (parent, { id }, context) => {
    //   return movieAPI.getMovieById(id);
    // },
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      if (context.user) {
        const newUser = await User.create(args);
        const token = signToken(newUser);
        return { token, user: newUser };
      }
      // throw new AuthenticationError("You need to be logged in!");
    },

    loginUser: async (parent, { email, password }, context) => {
      console.log(context);
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      console.log(user);
      if (user.id) {
        const token = signToken(user);
        return { token, user };
      }
    },

    // // updateUser: (parent, args, context) => {
    // //   // Update the User object with the provided ID with the provided input
    // //   // Return the updated User object
    // // },
    // // deleteUser: (parent, args, context) => {
    // //   // Delete the User object with the provided ID
    // //   // Return a boolean indicating whether the deletion was successful
    // // },

    /// addWatchedMovie: async (parent, { movieId, title }, context) => {
    //   const input = { movieId, title };

    //   if (!context.user) {
    //     throw new AuthenticationError(
    //       "must be logged in to perform this action"
    //     );
    //   }

    //   const user = await User.findOneAndUpdate(
    //     { _id: context.user._id },
    //     { $addToSet: { watchedMovies: movieId } }
    //   );

    //   return user;
    // },
    // removeWatchedMovie: (parent, args, context) => {
    //   // Remove the Watched object with the provided movieId from the User's watchedMovies array
    //   // Return the removed Watched object
    // },
    // addMovieToWatchlist: (parent, args, context) => {
    //   // Add a new Watchlist object to the User's watchlist array
    //   // Return the new Watchlist object
    // },
    // removeMovieFromWatchlist: (parent, args, context) => {
    //   // Remove the Watchlist object with the provided movieId from the User's watchlist array
    //   // Return the removed Watchlist object
    // },
    // addReview: async (_, { movieId, text, rating }, { dataSources, auth }) => {
    //   console.log(auth);
    //   const input = {
    //     movie: movieId,
    //     auth, //!Structuring data we're passing to Review.create
    //     text,
    //     rating,
    //   };
    //   const newReview = await Review.create(input);
    //   return newReview;

    //   // Create a new Review object for the provided User and Movie objects with the provided input
    //   // Return the new Review object
    // },
    //   updateReview: (parent, args, context) => {
    //     // Update the Review object with the provided ID with the provided input
    //     // Return the updated Review object
    //   },
    //   deleteReview: (parent, args, context) => {
    //     // Delete the Review object with the provided ID
    //     // Return the deleted Review object
    //   },
    //   addReaction: (parent, args, context) => {
    //     // Create a new Reaction object for the provided Review object with the provided input
    //     // Return the new Reaction object
    //   },
    //   deleteReaction: (parent, args, context) => {
    //     // Delete the Reaction object with the provided ID
    //     // Return the deleted Reaction object
    //   },
    //   addComment: (parent, args, context) => {
    //     // Create a new Comment object for the provided Review object with the provided input
    //     // Return the new Comment object
    //   },
    //   updateComment: (parent, args, context) => {
    //     // Update the Comment object with the provided ID with the provided input
    //     // Return the updated Comment object
    //   },
    //   deleteComment: (parent, args, context) => {
    //     // Delete the Comment object with the provided ID
    //     // Return the deleted Comment object
    //   },
    //   addReply: (parent, args, context) => {
    //     // Create a new Reply object for the provided Comment object with the provided input
    //     // Return the new Reply object
    //   },
    //   updateReply: async (parent, { replyId, text }, context) => {
    //     // Check if reply exists
    //     const existingReply = await db.reply.findOne({
    //       where: { id: replyId }
    //     })
    //     if (!existingReply) {
    //       throw new Error("Reply not found")
    //     }

    //     // Update reply
    //     const updatedReply = await db.reply.update(
    //       {
    //         text
    //       },
    //       { where: { id: replyId } }
    //     )

    //     return updatedReply
    //   },

    //   deleteReply: async (parent, { replyId }, context) => {
    //     // Check if reply exists
    //     const existingReply = await db.reply.findOne({
    //       where: { id: replyId }
    //     })
    //     if (!existingReply) {
    //       throw new Error("Reply not found")
    //     }

    //     // Delete reply
    //     await db.reply.destroy({ where: { id: replyId } })

    //     return existingReply
    //   },
    // }
  },
};
module.exports = resolvers;