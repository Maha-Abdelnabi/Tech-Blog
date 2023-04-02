const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// Render the home page
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    // Order the posts from most recent to least
    order: [["created_at", "DESC"]],
    // From the User table, include the post creator's user name
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        // From the Comment table, include all comments
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    // render the posts
    .then((dbPostData) => {
      // create an array for the posts, using the get method to trim extra sequelize object data out
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // pass the posts into the homepage template
      res.render("homepage", {posts});
    })
    // if there was a server error, return the error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
