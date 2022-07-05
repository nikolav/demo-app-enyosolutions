const { getType } = require("./get-type");
const { isNumeric } = require("./is-numeric");
const { isString } = require("./is-string");
const { isObject } = require("./is-object");
const { parseXmlString } = require("./xml-parser");
const { mysqlDate } = require("./mysql-date");
const { vowelCount } = require("./vowel-count");
const { has } = require("./has");
const { longestString } = require("./longest-string");
const { map: _map, groupBy, maxBy } = require("lodash");
const { splitWords } = require("./split-words");
//
module.exports = {
  _map,
  getType,
  groupBy,
  has,
  isNumeric,
  isObject,
  isString,
  longestString,
  maxBy,
  mysqlDate,
  parseXmlString,
  splitWords,
  vowelCount,
};
