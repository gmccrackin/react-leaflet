var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "LayerGroup",

  mixins: [eventsMixins("layerGroup")],

  propTypes: {
    layers: Type.array.isRequired
  },

  getInitialState() {
    return {layerGroup: Leaflet.layerGroup(this.props.layers)};
  },

  render() {
    if (this.props.map) {
      this.state.layerGroup.addTo(this.props.map);
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
