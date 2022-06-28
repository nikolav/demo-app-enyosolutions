const { getType } = require("./get-type");
const { isNumeric } = require("./is-numeric");
const { isString } = require("./is-string");
const { isObject } = require("./is-object");
const { parseXmlString } = require("./xml-parser");
const { mysqlDate } = require("./mysql-date");
const { vowelCount } = require("./vowel-count");
const { has } = require("./has");
const { longestString } = require("./longest-string");
const { map: _map } = require("lodash");
//
module.exports = {
  getType,
  has,
  isNumeric,
  isObject,
  isString,
  longestString,
  _map,
  mysqlDate,
  parseXmlString,
  vowelCount,
};
