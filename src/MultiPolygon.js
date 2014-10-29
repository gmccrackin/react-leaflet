var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngListType = require("./types/latlngList");

var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "MultiPolygon",

  mixins: [eventsMixins("multiPolygon")],

  propTypes: {
    polygons: Type.arrayOf(latlngListType).isRequired
  },

  getInitialState() {
    return {multiPolygon: Leaflet.multiPolyline(this.props.polygons, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.multiPolygon.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {
        map: this.props.map,
        layer: this.props.layer,
        multiPolygon: this.state.multiPolygon
      });
    });
    return <noscript>{children}</noscript>;
  }
});
