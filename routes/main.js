const router = require("express").Router();
const MainController = require("../controllers/MainController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/").get(MainController.homePage);

router
  .route("/posts/new")
  .get(isAuthenticated,MainController.addPostPage)
  .post(isAuthenticated,MainController.savePost);

router.route('/posts/:id')
      .get(MainController.postPage)
      .post(isAuthenticated,MainController.postComment)

router.post('/comments/:id',isAuthenticated, MainController.replyToComment);

module.exports = router;
