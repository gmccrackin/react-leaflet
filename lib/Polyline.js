var React = require("react/addons");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "Polyline",

  mixins: [eventsMixins("polyline")],

  propTypes: {
    positions: latlngListType.isRequired
  },

  getInitialState:function() {
    return {polyline: Leaflet.polyline(this.props.positions, this.props)};
  },

  render:function() {
    if (this.props.map) {
      this.state.polyline.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, function(child)  {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer
      });
    }.bind(this));
    return React.createElement("noscript", null, children);
  }
});
