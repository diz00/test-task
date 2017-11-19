const url = require("url");
const axios = require("axios");
const cheerio = require("cheerio");

exports.getParagraphsFromArticle = (req, res) => {
  const { query } = url.parse(req.url, true);

  if (!query || !query.articleURL) {
    return res.status(400).end();
  }

  axios
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
      return res.status(404).end();
    });
};
