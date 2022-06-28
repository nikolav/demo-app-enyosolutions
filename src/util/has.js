const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
module.exports = {
  has: (node, key) => has_(Object(node), key),
};
