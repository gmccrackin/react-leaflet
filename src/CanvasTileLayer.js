var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "CanvasTileLayer",

  mixins: [eventsMixins("tileLayer")],

  getInitialState() {
    return {tileLayer: Leaflet.tileLayer.canvas(this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.tileLayer.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.state.tileLayer
      });
    });
    return <noscript>{children}</noscript>;
  }
});
