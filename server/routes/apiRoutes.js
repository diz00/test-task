const router = require("express").Router();

const articleController = require("../controllers/articleController");

router.get("/fb", articleController.getParagraphsFromArticle);
router.post("/suggest", articleController.suggestParagraphChanges);
router.get("/suggest", articleController.getSuggestions);
router.delete("/suggest", articleController.deleteSuggestions);
router.post("/suggest/approve", articleController.approveSuggestions);
router.post("/suggest/approve-own", articleController.approveOwnSuggestion);

module.exports = router;
