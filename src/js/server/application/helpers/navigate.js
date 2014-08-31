
// todo: use Dispatcher to tell App to .navigate(path)
module.exports = function navigate(path) {
  history.pushState(history.state, '', path);
};
