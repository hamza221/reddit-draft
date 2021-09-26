const router = require("express").Router();
const MainController = require("../controllers/MainController");

router.route("/").get(MainController.getHome);

router
  .route("/posts/new")
  .get(MainController.getPostForm)
  .post(MainController.savePost);

module.exports = router;
