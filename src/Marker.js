var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngType = require("./types/latlng");

var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "Marker",

  mixins: [eventsMixins("marker")],

  propTypes: {
    position: latlngType.isRequired
  },

  getInitialState() {
    return {marker: Leaflet.marker(this.props.position, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.marker.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer,
        marker: this.state.marker
      });
    });
    return <noscript>{children}</noscript>;
  }
});
