var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "GeoJson",

  mixins: [eventsMixins("geoJson")],

  propTypes: {
    data: Type.object.isRequired
  },

  getInitialState() {
    return {geoJson: Leaflet.geoJson(this.props.data, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.geoJson.addTo(this.props.map);
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
