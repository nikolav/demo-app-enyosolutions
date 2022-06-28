const { getType } = require("./get-type");
const NUMERIC = getType(1);
//
module.exports = {
  isNumeric: (node) => NUMERIC === getType(node),
};
