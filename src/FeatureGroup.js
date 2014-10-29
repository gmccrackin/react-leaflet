var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "FeatureGroup",

  mixins: [eventsMixins("featureGroup")],

  propTypes: {
    layers: Type.array.isRequired
  },

  getInitialState() {
    return {featureGroup: Leaflet.featureGroup(this.props.layers)};
  },

  render() {
    if (this.props.map) {
      this.state.featureGroup.addTo(this.props.map);
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
