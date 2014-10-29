var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngListType = require("./types/latlngList");

var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "ImageOverlay",

  mixins: [eventsMixins("imageOverlay")],

  propTypes: {
    url: Type.string.isRequired,
    bounds: latlngListType.isRequired
  },

  getInitialState() {
    return {imageOverlay: Leaflet.imageOverlay(this.props.url, this.props.bounds, this.props)};
  },

  render() {
    if (this.props.map) {
      this.state.imageOverlay.addTo(this.props.map);
    }
    var children = React.Children.map(this.props.children, child => {
      return React.addons.cloneWithProps(child, {map: this.props.map});
    });
    return <noscript>{children}</noscript>;
  }
});
