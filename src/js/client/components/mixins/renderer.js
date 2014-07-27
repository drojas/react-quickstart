'use strict';

var RendererMixin = {
  render: function() {
    var options = this.getRenderOptions();
    return options.renderer.call(this, options);
  }
};

module.exports = RendererMixin;
