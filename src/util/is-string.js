const { getType } = require("./get-type");
const STRING = getType("a");

module.exports = {
  isString: (node) => STRING === getType(node),
};
