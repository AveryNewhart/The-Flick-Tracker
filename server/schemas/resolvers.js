//!Makes sure the user must be logged in to post a review  //!Will add more models when we hash them out in queries and mutations

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { User, Review, Movie, Comment, Reply, Reaction } = require("../models"); //we don't need to do the dataSource at all if we import all the models
const { ObjectId } = require("mongodb"); //! for review as of now

const resolvers = {
  Query: {
    user: async (parent, { username }, context) => {
      return await User.findOne({ username });
    },
    users: async (_, __, context) => {
      return await User.find();
    },
    review: async (parent, { id }, context) => {
      return await Review.create(id).populate("reviewPost");
    },
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
    movie: async (_, { id }, context) => {
      return await Movie.getMovieById(id);
    },
    protected: async (parent, args, context) => {
      //!Query defined in typeDef for authentication
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(context.user);
        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    createUser: async (parent, { input }) => {
      console.log(input);
      const user = await User.create(input);
      const token = signToken(user);

      return { token, user };
    },

    loginUser: async (parent, { email, password }) => {
      // console.log(context);
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
    deleteUser: async (parent, { password }, { user }) => {
      // Check if user is logged in
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Find user by ID and delete
      const deletedUser = await User.findByIdAndDelete(user._id); //!pass id from user

      // If user is not found, throw an error
      if (!deletedUser) {
        throw new AuthenticationError("User not found.");
      }
      console.log(deletedUser.username);
      return deletedUser;
    },

    addFollower: async (parent, { userId, followedUserId }, { user }) => {
      // Authentication check to make sure we have a valid user.
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      console.log("Logged in User:", userId);
      console.log("ID of the person being followed: ", followedUserId);

      const followedUser = await User.findByIdAndUpdate(
        { _id: followedUserId },
        { $addToSet: { followers: user._id } },
        { new: true }
      );

      // If no user is found in the query then we will return an error.
      if (!followedUser) {
        throw new UserInputError("User not found.");
      }

      const followingUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { followings: followedUserId } },
        { new: true }
      );

      console.log("Logged in User:", user.username, user);
      console.log("Followed user:", followedUser);
      console.log("Following user:", followingUser);

      // Return the user with the updated followings and followers arrays.
      return followingUser;
    },

    unfollow: async (parent, { userId, followedUserId }, { user }) => {
      // Authentication check to make sure we have a valid user.
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      console.log("Logged in User:", userId);
      console.log("ID of the person being unfollowed: ", followedUserId);

      const unfollowedUser = await User.findByIdAndUpdate(
        { _id: followedUserId },
        { $pull: { followers: user._id } },
        { new: true }
      );

      // If no user is found in the query then we will return an error.
      if (!unfollowedUser) {
        throw new UserInputError("User not found.");
      }

      const unfollowingUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { followings: followedUserId } },
        { new: true }
      );

      console.log("Logged in User:", user.username, user);
      console.log("Unfollowed user:", unfollowedUser);
      console.log("Unfollowing user:", unfollowingUser);

      // Return the user with the updated followings and followers arrays.
      return unfollowingUser;
    },
    removeWatchedMovie: async (parent, { movie, input }, context) => {
      if (context.user) {
        console.log(input)

        const dataMovie = await User.findOneAndUpdate(
          { movie },
          { $pull: { watchedMovies: { _id: context.user._id, input } } },
          { new: true, runValidators: true }
        ).populate(watchedMovies)

        return dataMovie
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },
    addWatchedMovie: async (parent, { movie }, context) => {
      if (context.user) {
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchedMovies: movie } },
          { new: true, runValidators: true },
        ).populate("watchedMovies")
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeWatchedMovie: async (parent, { input }, context) => {
      if (context.user) {
        const { movieId } = input;
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchedMovies: { movieId: movieId } } },
          { new: true }
        ));
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },

    addMovieToWatchlist: async (parent, { movie }, context) => {
      if (context.user) {
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchlist: movie } },
          { new: true, runValidators: true }
        ));
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeMovieFromWatchlist: async (parent, { input }, context) => {
      if (context.user) {
        const { movieId } = input;
        return (updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchlist: { movieId: movieId } } },
          { new: true }
        ));
      }
      throw new AuthenticationError("must be logged in to perform this action");
    },
             
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


    addReview: async (_, { movieId, reviewText, reviewAuthor }, context) => {
      if (context.user) {
      const newReview = await Review.create({
        reviewText,
        reviewAuthor: context.user.username
      })
      


      throw new AuthenticationError("You need to be logged in!");
    }
      
      
      // await User.findOneAndUpdate(
      //   { _id: context.user._id },
      //   { $addToSet: { reviews } }
      // )


      // Add the review to the movie's reviews array
      // const updatedMovie = await Movie.findByIdAndUpdate(
      //   { _id: movieId },
      //   { $push: { reviews: newReview._id } },
      //   { new: true }
      // );

    },
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
}
module.exports = resolvers;
