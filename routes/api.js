var express = require("express");
var router = express.Router();
const axios = require("axios");
const { client } = require("../src/mysq-connection");
const {
  has,
  isString,
  longestString,
  _map,
  mysqlDate,
  parseXmlString,
  vowelCount,
} = require("../src/util");
//
const FEEDS = [
  "https://www.lemonde.fr/rss/une.xml",
  "https://www.theguardian.com/world/europe-news/rss",
];

//
// api about
// GET /api
router.get("/", (_req, res) => {
  res.json({
    "app.name": "demo:enyosolutions",
    "api.github": "https://github.com/nikolav/demo-app-enyosolutions",
  });
});
//
/////////////////////////////
/////////// TESTS ///////////
/////////////////////////////
// POST /api/test
// db connection test
router.post("/test", (req, res) => {
  client.query(`select ? as test`, [req.body.test], (_error, result, _cols) => {
    return res.json({
      test: result[0].test,
    });
  });
});
// verify tables exist
// fetch row counts
router.get("/test/tables", (_req, res) => {
  client.query(
    `
      select 
        count(a.id) as totalArticles, 
        count(i.id) as totalImports
      from 
        articles as a, imports as i
    `,
    (_error, result, _cols) => {
      return res.json({
        totalArticles: result[0].totalArticles,
        totalImports: result[0].totalImports,
      });
    }
  );
});
// verify news feeds are on
// fetch row content
router.get("/test/feeds", (_req, res) => {
  Promise.all(FEEDS.map((feed) => axios(feed))).then((feeds) => {
    res.json({
      feeds: _map(feeds, "data"),
    });
  });
});
//
/////////////////////////////////////////
/////////// ARTICLES RESOURCE ///////////
/////////////////////////////////////////
//
// read all articles; +longest-word-by-vowel-count
// GET /api/articles
router.get("/articles", (_req, res) => {
  client.query(`select * from articles`, (error, articles, _cols) => {
    if (error) throw error;
    //
    res.json({
      articles: articles.map((article) => {
        // make groups with the same vowel count
        // store words accordingly
        //   {[key: number]: string[]}
        const groupByVowelCount = article.title
          .split(/\s+/)
          .reduce((w, word) => {
            const vcWord = vowelCount(word);
            if (has(w, vcWord)) {
              w[vcWord].push(word);
            } else {
              w[vcWord] = [word];
            }
            //
            return w;
          }, {});

        return {
          // take longest word in a group with max vowel count
          "word-with-the-most-vowels-in-the-title": longestString(
            groupByVowelCount[Math.max(...Object.keys(groupByVowelCount))]
          ),
          ...article,
        };
      }),
    });
  });
});
//
// load articles
// POST /api/articles/import/?siteRssUrl
router.post("/articles/import", (req, res) => {
  const { siteRssUrl: feed } = req.query;
  if (!feed) return res.json(null);
  // fetch feed
  axios(feed).then(({ data }) => {
    // @xml2js
    // https://github.com/Leonidas-from-XIV/node-xml2js
    parseXmlString(data, (error, feed) => {
      if (error) throw error;
      // save articles
      feed.rss.channel[0].item.forEach(articleSave);
      // save raw rss json
      importsSave(JSON.stringify(feed));
      // data saved, signal success
      res.json({ status: 1 });
    });
    //
  });
  //
});
//
module.exports = router;

//
// heplers
function articleSave(article) {
  const { title, link, description, pubDate: publicationDate } = article;
  const externalId = getGuid(article);
  const mainPicture = article["media:content"][0]["$"].url;
  //
  client.query(
    `
    insert into articles
      (description, externalId, link, mainPicture, publicationDate, title)

    values
      (?, ?, ?, ?, ?, ?)

    on duplicate key update
      description      = values(description),
      link             = values(link),
      mainPicture      = values(mainPicture),
      publicationDate  = values(publicationDate),
      title            = values(title)
    `,
    [
      description[0],
      externalId,
      link[0],
      mainPicture,
      mysqlDate(publicationDate[0]),
      title[0],
    ]
  );
}
function importsSave(data) {
  client.query(
    `
    insert into imports 
      (rawContent)
    values (?)
  `,
    [data]
  );
}
//
function getGuid(article) {
  const guid = article.guid[0];
  return guid ? (isString(guid) ? guid : guid._) : null;
}
