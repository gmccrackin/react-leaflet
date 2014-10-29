var React = require("react/addons");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "Rectangle",

  mixins: [eventsMixins("rectangle")],

  propTypes: {
    bounds: latlngListType.isRequired
  },

  getInitialState() {
    return {rectangle: Leaflet.rectangle(this.props.bounds, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.rectangle.addTo(this.props.map);
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
