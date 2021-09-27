const router = require("express").Router();
const MainController = require("../controllers/MainController");

router.route("/").get(MainController.homePage);

router
  .route("/posts/new")
  .get(MainController.addPostPage)
  .post(MainController.savePost);

router.route('/posts/:id')
      .get(MainController.postPage)
      .post(MainController.postComment)

router.post('/comments/:id', MainController.replyToComment);

module.exports = router;
