const router = require("express").Router();

const articleController = require("../controllers/articleController");

router.get("/fb", articleController.getParagraphsFromArticle);

module.exports = router;
