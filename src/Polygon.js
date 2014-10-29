var React = require("react/addons");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "Polygon",

  mixins: [eventsMixins("polygon")],

  propTypes: {
    positions: latlngListType.isRequired
  },

  getInitialState() {
    return {polygon: Leaflet.polygon(this.props.positions, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.polygon.addTo(props.map);
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
