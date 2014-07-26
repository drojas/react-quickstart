
module.exports = function navigate(path) {
  history.pushState(history.state, '', path);
};
