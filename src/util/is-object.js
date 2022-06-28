const { getType } = require("./get-type");
const OBJECT = getType({});
//
module.exports = {
  isObject: (node) => OBJECT === getType(node),
};
