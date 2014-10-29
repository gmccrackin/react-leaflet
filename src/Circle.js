var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngType = require("./types/latlng");

var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "Circle",

  mixins: [eventsMixins("circle")],

  propTypes: {
    center: latlngType.isRequired,
    radius: Type.number.isRequired
  },

  getInitialState() {
    return {circle: Leaflet.circle(this.props.center, this.props.radius, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.circle.addTo(this.props.map);
    }
    var children = react.Children.map(this.props.children, child => {
      return react.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer
      });
    });
    return <noscript>{children}</noscript>;
  }
});
