const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Review, Comment, Reaction, Reply, Watched, Watchlist } = require("../models")

const resolvers = {
     Query: {
    user: (parent, { id }, { dataSources }, info) => {
      return dataSources.userAPI.getUserById(id);
    },
    users: (parent, args, { dataSources }, info) => {
      return dataSources.userAPI.getUsers();
    },
    review: (parent, { id }, { dataSources }, info) => {
      return dataSources.reviewAPI.getReviewById(id);
    },
    reviews: (parent, args, { dataSources }, info) => {
      return dataSources.reviewAPI.getReviews();
    },
    watched: (parent, { id }, { dataSources }, info) => {
      return dataSources.watchedAPI.getWatchedById(id);
    },
    watchlist: (parent, { id }, { dataSources }, info) => {
      return dataSources.watchlistAPI.getWatchlistById(id);
    },
    watchedMovies: (parent, args, { dataSources }, info) => {
      return dataSources.watchedAPI.getWatchedMovies();
    },
    watchlistMovies: (parent, args, { dataSources }, info) => {
      return dataSources.watchlistAPI.getWatchlistMovies();
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
    }
  },
  
    Mutation: {
        createUser: (parent, { CreateUserInput }) => {
            const newUser = { CreateUserInput };
            User.push(newUser);
            return newUser;
        
        
        // Create a new User object based on the provided input
        // Return the new User object
      },
      updateUser: (parent, args, context, info) => {
        // Update the User object with the provided ID with the provided input
        // Return the updated User object
      },
      deleteUser: (parent, args, context, info) => {
        // Delete the User object with the provided ID
        // Return a boolean indicating whether the deletion was successful
      },
      addWatchedMovie: (parent, args, context, info) => {
        // Add a new Watched object to the User's watchedMovies array
        // Return the new Watched object
      },
      removeWatchedMovie: (parent, args, context, info) => {
        // Remove the Watched object with the provided movieId from the User's watchedMovies array
        // Return the removed Watched object
      },
      addMovieToWatchlist: (parent, args, context, info) => {
        // Add a new Watchlist object to the User's watchlist array
        // Return the new Watchlist object
      },
      removeMovieFromWatchlist: (parent, args, context, info) => {
        // Remove the Watchlist object with the provided movieId from the User's watchlist array
        // Return the removed Watchlist object
      },
      addReview: (parent, args, context, info) => {
        // Create a new Review object for the provided User and Movie objects with the provided input
        // Return the new Review object
      },
      updateReview: (parent, args, context, info) => {
        // Update the Review object with the provided ID with the provided input
        // Return the updated Review object
      },
      deleteReview: (parent, args, context, info) => {
        // Delete the Review object with the provided ID
        // Return the deleted Review object
      },
      addReaction: (parent, args, context, info) => {
        // Create a new Reaction object for the provided Review object with the provided input
        // Return the new Reaction object
      },
      deleteReaction: (parent, args, context, info) => {
        // Delete the Reaction object with the provided ID
        // Return the deleted Reaction object
      },
      addComment: (parent, args, context, info) => {
        // Create a new Comment object for the provided Review object with the provided input
        // Return the new Comment object
      },
      updateComment: (parent, args, context, info) => {
        // Update the Comment object with the provided ID with the provided input
        // Return the updated Comment object
      },
      deleteComment: (parent, args, context, info) => {
        // Delete the Comment object with the provided ID
        // Return the deleted Comment object
      },
      addReply: (parent, args, context, info) => {
        // Create a new Reply object for the provided Comment object with the provided input
        // Return the new Reply object
      },
      updateReply: async (parent, { replyId, text }, { dataSources }, info) => {
        // Check if reply exists
        const existingReply = await dataSources.db.reply.findOne({
          where: { id: replyId }
        });
        if (!existingReply) {
          throw new Error("Reply not found");
        }
  
        // Update reply
        const updatedReply = await dataSources.db.reply.update(
          {
            text
          },
          { where: { id: replyId } }
        );
  
        return updatedReply;
      },
  
      deleteReply: async (parent, { replyId }, { dataSources }, info) => {
        // Check if reply exists
        const existingReply = await dataSources.db.reply.findOne({
          where: { id: replyId }
        });
        if (!existingReply) {
          throw new Error("Reply not found");
        }
  
        // Delete reply
        await dataSources.db.reply.destroy({ where: { id: replyId } });
  
        return existingReply;
      }
    }
  };
  
  module.exports = resolvers;