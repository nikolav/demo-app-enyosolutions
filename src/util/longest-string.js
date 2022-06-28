const longestString = (ls = []) =>
  ls.reduce(
    (s, text) => {
      if (s.s.length < text.length) s.s = text;
      return s;
    },
    { s: "" }
  ).s;
//
module.exports = {
  longestString,
};
