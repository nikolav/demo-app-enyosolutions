const reVowel = /^[aeiouy]$/i;
const vowelCount = (text) =>
  Array.prototype.filter.call(text, (ch) => reVowel.test(ch)).length;
//
module.exports = {
  vowelCount,
};
