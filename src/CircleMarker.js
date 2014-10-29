var React = require("react/addons");
var Leaflet = require("leaflet");

var latlngType = require("./types/latlng");
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "CircleMarker",

  mixins: [eventsMixins("circleMarker")],

  propTypes: {
    center: latlngType.isRequired
  },

  getInitialState() {
    return {circleMarker: Leaflet.circleMarker(this.props.center, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.circleMarker.addTo(this.props.map);
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
