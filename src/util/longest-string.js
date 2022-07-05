const { maxBy } = require("lodash");
//
module.exports = {
  longestString: (words) => maxBy(words, "length"),
};
