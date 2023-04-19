const { User, Review } = require("../models");

//aggregate function to get total number of followers from a user
const followerCount = async () =>
  User.aggregate()
    .count("followerCount")
    .then((numberOfFollowers) => numberOfFollowers);

//aggregate function to get total number users a user is following
const followingCount = async () =>
  User.aggregate()
    .count("followerCount")
    .then((numberOfFollowing) => numberOfFollowing);


module.exports = {
  //USER CRUD

  //!       get all users, and utilize aggregate function friendCount
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then(async (users) => {
        const userObj = {
          users,
          followerCount: await followerCount(),
          followingCount: await followingCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //!       get single user based off required parameter UserId
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("follow")
      .populate("followers")
      .populate("reviews")
      .then(async (user) => {
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //!       create new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //!       update User with a required parameter of the userId
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
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

  //!       Delete user with a required parameter of the userId
  async deleteUser(req, res) {
    let user = await User.findOne({ _id: req.params.userId });
    for (var i = 0; i < user.thoughts.length; i++) {
      await Thought.findOneAndDelete({ _id: user.thoughts[i]._id });
    }
    user = await User.findOneAndDelete({ _id: req.params.userId });

    !user
      ? res.status(404).json({
          message: "user deleted, but no Reviews found",
        })
      : res.json({ message: "user successfully deleted" });
  },

  //Follow/Followers
  //!       Handle adding a follow, and cooresponding following from the user that is being followed

  addFollow(req, res) {
    console.log("You are following someone");
    console.log(req.body.followingId);

    const followedUserId = req.params.followId;
    const followerUserId = req.params.userId;

    // wait for both updates to complete before sending response
    Promise.all([
      // Adds the follow to a users followed users
      User.findOneAndUpdate(
        { _id: followerUserId },
        { $addToSet: { follow: followedUserId } },
        { runValidators: true, new: true }
      ),
      // Takes the user being followed, and adds it to their following
      User.findOneAndUpdate(
        { _id: followedUserId },
        { $addToSet: { followers: followerUserId } },
        { runValidators: true, new: true }
      ),
    ])
      .then(([followerUser, followedUser]) => {
        if (!followerUser || !followedUser) {
          res.status(404).json({ message: "No user found with that ID 😱" });
        } else {
          res.json(followerUser);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //!       Handle removing a follow, and cooresponding following from the user that is being followed
  removeFollow(req, res) {
    console.log("You are unfollowing someone");
    console.log(req.body.followingId);

    const unfollowedUserId = req.params.followId;
    const unfollowerUserId = req.params.userId;

    //wait for both updates to complete before sending response
    Promise.all([
      User.findOneAndUpdate(
        { _id: unfollowerUserId },
        { $pull: { follow: unfollowedUserId } },
        { new: true }
      ),
      User.findOneAndUpdate(
        { _id: unfollowedUserId },
        { $pull: { followers: unfollowerUserId } },
        { new: true }
      ),
    ])
      .then(([unfollowerUser, unfollowedUser]) => {
        if (!unfollowerUser || !unfollowedUser) {
          res.status(404).json({ message: "No user found with that ID 😱" });
        } else {
          res.json(unfollowerUser);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
