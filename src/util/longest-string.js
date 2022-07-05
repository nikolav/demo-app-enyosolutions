const { maxBy } = require("./index");
//
module.exports = {
  longestString: (words) => maxBy(words, "length"),
};
