var clone = require("lodash-node/modern/objects/clone");
var forEach = require("lodash-node/modern/collections/forEach");
var reduce = require("lodash-node/modern/collections/reduce");

module.exports = function(elName) {
  return {
    extractEvents: function(props) {
      var re = /onLeaflet(.+)/i;
      return reduce(props, (res, cb, ev) => {
        if (re.test(ev)) {
          var key = ev.replace(re, (match, p) => p.toLowerCase());
          res[ key ] = cb;
        }
        return res;
      }, {});
    },

    bindEvents: function(next, prev) {
      var el = this.state[ elName ];
      if (!el) return;

      next = next || {};
      prev = prev || {};
      var diff = clone(prev);

      forEach(prev, (cb, ev) => {
        if (!next[ ev ] || cb !== next[ ev ]) {
          delete diff[ ev ];
          el.off(ev, cb);
        }
      });

      forEach(next, (cb, ev) => {
        if (!prev[ ev ] || cb !== prev[ ev ]) {
          diff[ ev ] = cb;
          el.on(ev, cb);
        }
      });

      return diff;
    },

    fireEvent: function(type, data) {
      var el = this.state[ elName ];
      if (el) el.fire(type, data);
    },

    componentWillMount: function() {
      this.setState({
        _events: this.extractEvents(this.props)
      });
    },

    componentDidMount: function() {
      this.bindEvents(this.state._events);
    },

    componentWillReceiveProps: function(nextProps) {
      var next = this.extractEvents(nextProps);
      var bound = this.bindEvents(next, this.state._listeners);
      this.setState({
        _events: bound
      });
    },

    componentWillUnmount: function() {
      var el = this.state[ elName ];
      if (!el) return;

      forEach(this.state._events, (cb, ev) => {
        el.off(ev, cb);
      });
    }
  }
};
