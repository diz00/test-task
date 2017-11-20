const url = require("url");
const axios = require("axios");
const cheerio = require("cheerio");
const sanitizeHtml = require("sanitize-html");

const Change = require("../models/Change");

exports.getParagraphsFromArticle = (req, res) => {
  const { query } = url.parse(req.url, true);

  if (!query || !query.articleURL) {
    return res.status(400).end();
  }

  return axios
    .get(query.articleURL)
    .then(response => {
      const $ = cheerio.load(response.data);
      const title = $("title").text();
      const paragraphs = [];
      $("p").each((i, el) => {
        paragraphs.push($(el).text());
      });
      return res.status(200).json({ title, paragraphs });
    })
    .catch(e => {
      // url doesn't exist
      return res.status(404).json({ error: e });
    });
};

exports.suggestParagraphChanges = (req, res) => {
  if (!req.body.articleUrl || !req.body.originalText || !req.body.usersText) {
    return res.status(400).end();
  }

  const newChange = new Change({
    articleUrl: sanitizeHtml(req.body.articleUrl),
    originalText: sanitizeHtml(req.body.originalText),
    usersText: sanitizeHtml(req.body.usersText)
  });

  newChange
    .save()
    .then(() => {
      res.status(200).end();
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });

  return res.status(200).end();
};

exports.getSuggestions = (req, res) => {
  Change.getSuggestions()
    .then(suggestions => {
      res.status(200).json(suggestions);
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
};

exports.deleteSuggestions = (req, res) => {
  if (!req.body.originalText) {
    return res.status(400).end();
  }

  return Change.deleteMany({ originalText: req.body.originalText })
    .then(() => {
      res.status(200).end();
    })
    .catch(e => {
      res.status(400).json({ error: e });
    });
};

exports.approveSuggestions = (req, res) => {
  const { suggestionId, originalText } = req.body;
  if (!suggestionId || !originalText) {
    return res.status(400).end();
  }

  return Change.updateMany(
    {
      originalText
    },
    {
      $set: {
        isApproved: false
      }
    }
  )
    .then(() => {
      return Change.update(
        { _id: suggestionId },
        { $set: { isApproved: true } }
      );
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
};

exports.approveOwnSuggestion = (req, res) => {
  const { originalText, usersText, articleUrl } = req.body;
  if (!originalText || !usersText || !articleUrl) {
    return res.status(400).end();
  }

  return Change.updateMany(
    {
      originalText
    },
    {
      $set: {
        isApproved: false
      }
    }
  )
    .then(() => {
      const newChange = new Change({
        articleUrl: sanitizeHtml(req.body.articleUrl),
        originalText: sanitizeHtml(req.body.originalText),
        usersText: sanitizeHtml(req.body.usersText),
        isApproved: true
      });

      return newChange.save();
    })
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
};
