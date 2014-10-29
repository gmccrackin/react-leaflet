var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngListType = require("./types/latlngList");

var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "MultiPolyline",

  mixins: [eventsMixins("multiPolyline")],

  propTypes: {
    polylines: Type.arrayOf(latlngListType).isRequired
  },

  getInitialState() {
    return {multiPolyline: Leaflet.multiPolyline(this.props.polylines, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.multiPolyline.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer,
        multiPolyline: this.state.multiPolyline
      });
    });
    return <noscript>{children}</noscript>;
  }
});
