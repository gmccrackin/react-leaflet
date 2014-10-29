var React = require("react/addons");
var Leaflet = require("leaflet");
var eventsMixins = require("./mixins/events");

module.exports = React.createClass({
  displayName: "WMSTileLayer",

  mixins: [eventsMixins("tileLayer")],

  propTypes: {
    url: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {tileLayer: Leaflet.tileLayer.wms(this.props.url, this.props)};
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
