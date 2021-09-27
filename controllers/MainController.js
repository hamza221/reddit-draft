const ErrorResponse = require("../utils/errorResponse");
const Post = require("../models/Post");
const Comment = require("../models/Comment");


class MainController {

  static async homePage(req, res, next) {
    try {
      const posts = await Post.find({}).lean();
      if (!posts) {
        return next(ErrorResponse.notFound("no post found"));
      }
      res.render("index", { posts });
    } catch (err) {
      next(err);
    }
  }
  static async addPostPage(req, res, next) {
    try {
      res.render("newPost");
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
      console.log(err)
      next(err);
    }
  }
  static async postPage(req, res, next){
      try{
         const postId = req.params.id;
         const post = await Post.findOne({_id:postId}).lean();
         console.log(post)
         res.render('singlePost', {post})
      }
      catch(err){
        console.error(err)
        next(err)
      }
  }
  static async postComment(req, res ,next){

    try{
        const commentBody = req.body.comment;
        const comment = await  Comment.create({body:commentBody});
        await Post.findOneAndUpdate({_id:req.params.id},{$push:{comments :comment._id} },{new:true});
        res.redirect('back');
    }catch(err){
      next(err)
    }
  }
  static async replyToComment(req,res, next){
    try {
      const comment = await Comment.create({body:req.body.reply})
      await Comment.findOneAndUpdate({_id:req.params.id}, {$push:{comments: comment._id}})
      res.redirect('back')
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = MainController;
