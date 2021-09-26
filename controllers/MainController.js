const ErrorResponse = require("../utils/errorResponse");
const Post = require("../models/Post");

class MainController {
  static async getHome(req, res, next) {
    try {
      const posts = await Post.find({}).lean();
      if (!posts) {
        return next(ErrorResponse.notFound("no post found"));
      }
      res.render("home", { posts });
    } catch (err) {
      next(err);
    }
  }
  static async getPostForm(req, res, next) {
    try {
      res.render("posts-new");
    } catch (err) {
      next(err);
    }
  }
  static async savePost(req, res, next) {
    try {
      const { title, url, summary } = req.body;
      if (!title || !url || !summary) {
        return next(ErrorResponse.badRequest("all fields are required"));
      }
      const post = new Post({ title, url, summary });

      await post.save();
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MainController;
