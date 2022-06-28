var express = require("express");
var router = express.Router();
const { client } = require("../src/mysq-connection");

//
const axios = require("axios");
const qs = require("qs");

//
// api welcome response
// POST /api
router.post("/", function (req, res, next) {
  res.json({
    "app.version": "demo:0.0.0",
    "app.name": "demo:enyosolutions",
    ...req.body,
  });
});

/////////////////////////////
/////////// TESTS ///////////
/////////////////////////////
// POST /api/test
// for db connection test
router.post("/test", (req, res) => {
  client.query(`select '${req.body.test}' as test`, (_error, result, _cols) => {
    return res.json({
      test: result[0].test,
    });
  });
});
router.get("/test/tables", (req, res) => {
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

//////
//////
//
module.exports = router;
