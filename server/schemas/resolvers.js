//!Makes sure the user must be logged in to post a review  //!Will add more models when we hash them out in queries and mutations

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Review, Movie, Comment, Reply, Reaction } = require("../models"); //we don't need to do the dataSource at all if we import all the models

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username });
    },
    users: async (_, __, context) => {
      return await User.find();
    },
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
    createUser: async (parent, { input }) => {
      console.log(input);
      const user = await User.create(input);
      const token = signToken(user);

      return { token, user };
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
    deleteUser: async (parent, { id }, { user }) => {
      // Check if user is logged in
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Find user by ID and delete
      const deletedUser = await User.findByIdAndDelete(id);

      // If user is not found, throw an error
      if (!deletedUser) {
        throw new AuthenticationError("User not found.");
      }
      console.log(deletedUser.username);
      return deletedUser;
    },

    addFollower: async (parent, { input }, { user }) => {
      //authentication check to make sure we have a valid user.
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      //having our destructured userId equal our input args for the addFollower resolver mutation function
      const { userId } = input;
      console.log(user); // user is going to be just the credentials of the username email and Id

      // Find the user who is being followed
      const followedUser = await User.findById(userId);
      console.log("followedUser", followedUser);
      // We are taking the user object and finding the userId to call it as followingUser
      const followingUser = await User.findById(user._id);
      console.log("followingUser", followingUser);

      //If no user is found in the query than we will return an error.
      if (!followedUser) {
        throw new UserInputError("User not found.");
      }

      // Add the user to the follower array of the followedUser
      followedUser.followers.push(user._id);
      console.log("_id of user", user._id);
      console.log("followedUser.followers", followedUser.followers);

      console.log(followedUser._id);
      // Save the followedUser
      await followedUser.save();
      // Add the followedUser to the followings array of the user

      followingUser.followings.push(followedUser._id);

      // Save the user
      await followingUser.save();

      // Return the user with the updated followings and followers arrays
      return followingUser;
    },

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
