const { User, Review, Reaction, Comment } = require("../models");

module.exports = {
//REVIEWS
  //!       Get all reviews
  getReviews(req, res) {
    Review.find()
      .then((reviews) => res.json(reviews))
      .catch((err) => res.status(500).json(err));
  },

  //!       create new review
  createReview(req, res) {
    Review.create(req.body)
      .then((review) => {
        User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { reviews: review._id } }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).send("username does not exist");
            } else {
              console.log(userData);
              res.json(review);
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //!       Get single Review by using required parameter reviewId
  getSingleReview(req, res) {
    Review.findOne({ _id: req.params.reviewId })
      .select("-__v")
      .populate("comments")
      .populate("reactions")
      .then(async (review) => {
        !review
          ? res.status(404).json({ message: "No review with that ID" })
          : res.json({ review });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //!       Delete a review
  deleteReview(req, res) {
    Review.findOneAndDelete({ _id: req.params.reviewId })
      .then((review) =>
        !review
          ? res
              .status(404)
              .json({ message: "Ran into issues deleting your review" })
          : review.deleteMany({ _id: { $in: review.users } })
      )
      .then(() => res.json({ message: "Review deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //!       Update a review
  updateReview(req, res) {
    Review.findOneAndUpdate(
      { _id: req.params.reviewId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((review) =>
        !review
          ? res.res
              .status(404)
              .json({ message: "Ran into issues processing your review" })
          : res.json(review)
      )
      .catch((err) => res.status(500).json(err));
  },

//REACTIONS

  //!       Create a reaction

  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        Review.findOneAndUpdate(
          { _id: req.params.reviewId },
          { $addToSet: { reactions: reaction._id } }
        )
          .then((reviewData) => {
            if (!reviewData) {
              res.status(404).send("review does not exist");
            } else {
              console.log(reviewData);
              res.json(reaction);
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //!       Delete a reaction

  removeReaction(req, res) {
    Review.findOneAndUpdate(
      { _id: req.params.reviewId },
      { $pull: { reactions: req.params.reactionId } }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: "No reaction found with that ID :(" })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  //!       Update Reaction
  updateReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID 😱" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },


//COMMENTS
  //!       Create a comment
  createComment(req, res) {
    const { reviewId, content, parentId } = req.body;

    if (parentId) {
      // If parentId is provided, create a CommentReply document
      CommentReply.create({ content, parentId })
        .then((commentReply) => {
          Comment.findByIdAndUpdate(
            parentId,
            { $push: { replies: commentReply._id } },
            { new: true }
          )
            .then((parentComment) => {
              if (!parentComment) {
                return res
                  .status(404)
                  .send("Comment no longer exsists");
              }
              return res.json(commentReply);
            })
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    } else {
      // If parentId is not provided, create a Comment document
      Comment.create({ content })
        .then((comment) => {
          Review.findByIdAndUpdate(
            reviewId,
            { $push: { comments: comment._id } },
            { new: true }
          )
            .then((review) => {
              if (!review) {
                return res.status(404).send("Review does not exist");
              }
              return res.json(comment);
            })
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(500).json(err));
    }
  },

  //!       Create a comment reaction
  createCommentReaction(req, res) {
    const { commentId, userId, reactionType } = req.body;

    CommentReaction.create({ commentId, userId, reactionType })
      .then((commentReaction) => {
        Comment.findByIdAndUpdate(
          commentId,
          { $push: { reactions: commentReaction._id } },
          { new: true }
        )
          .then((comment) => {
            if (!comment) {
              return res.status(404).send("Comment does not exist");
            }
            return res.json(commentReaction);
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },





  //!       Delete a comment

  deleteComment(req, res) {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId)
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).send("Comment not found");
      }

      // Remove the comment ID from the review's comments array
      Review.findByIdAndUpdate(
        deletedComment.reviewId,
        { $pull: { comments: commentId } },
        { new: true }
      ).catch((err) => {
        console.error(err);
      });

      // Remove any associated comment reactions
      CommentReaction.deleteMany({ commentId: commentId })
        .then(() => {
          return res.send("Comment deleted");
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json(err);
        });
    })
    .catch((err) => res.status(500).json(err));
},

deleteCommentReply(req, res) {
  const { replyId } = req.params;

  CommentReply.findByIdAndDelete(replyId)
    .then((deletedReply) => {
      if (!deletedReply) {
        return res.status(404).send("Reply not found");
      }

      // Remove the reply ID from the parent comment's replies array
      Comment.findByIdAndUpdate(
        deletedReply.parentId,
        { $pull: { replies: replyId } },
        { new: true }
      ).catch((err) => {
        console.error(err);
      });

      // Remove any associated comment reactions
      CommentReaction.deleteMany({ replyId: replyId })
        .then(() => {
          return res.send("Reply deleted");
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json(err);
        });
    })
    .catch((err) => res.status(500).json(err));
},

  //!       Update Comment
  updateComment(req, res) {
    const { commentId, content } = req.body;

    Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    )
      .then((comment) => {
        if (!comment) {
          return res.status(404).send("Comment does not exist");
        }
        return res.json(comment);
      })
      .catch((err) => res.status(500).json(err));
  },

  //!       Update a comment reply
  updateCommentReply(req, res) {
    const { replyId, content } = req.body;

    CommentReply.findByIdAndUpdate(
      replyId,
      { content },
      { new: true }
    )
      .then((reply) => {
        if (!reply) {
          return res.status(404).send("Comment reply does not exist");
        }
        return res.json(reply);
      })
      .catch((err) => res.status(500).json(err));
  },

  //!       Update a comment reaction
  updateCommentReaction(req, res) {
    const { reactionId, type } = req.body;

    CommentReaction.findByIdAndUpdate(
      reactionId,
      { type },
      { new: true }
    )
      .then((reaction) => {
        if (!reaction) {
          return res.status(404).send("Comment reaction does not exist");
        }
        return res.json(reaction);
      })
      .catch((err) => res.status(500).json(err));
  },
};