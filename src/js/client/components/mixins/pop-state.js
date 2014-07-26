
module.exports = {

  handlePopState: function() {
    this.forceUpdate();
  },

  listenToPopState: function() {
    window.addEventListener('popstate', this.handlePopState);
  },

  stopListeningToPopState: function() {
    window.removeEventListener('popstate', this.handlePopState);
  },

  componentDidMount: function() {
    this.listenToPopState();
  }
};
