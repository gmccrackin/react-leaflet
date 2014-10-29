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

  getInitialState() {
    return {polyline: Leaflet.polyline(this.props.positions, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.polyline.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer
      });
    });
    return <noscript>{children}</noscript>;
  }
});
