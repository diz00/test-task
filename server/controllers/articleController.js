const path = require("path");
const url = require("url");
const axios = require("axios");
const cheerio = require("cheerio");

exports.getParagraphsFromArticle = (req, res) => {
  const { query } = url.parse(req.url, true);

  if (!query || !query.articleURL) {
    return res.sendFile(path.resolve(__dirname, "../../index.html"));
  }

  axios
    .get(query.articleURL)
    .then(response => {
      const $ = cheerio.load(response.data);
      const paragraphs = [];
      $("p").each((i, el) => {
        paragraphs.push($(el).text());
      });
      return res.status(200).json(paragraphs);
    })
    .catch(e => {
      // url doesn't exist
      return res.status(404).end();
    });
};
