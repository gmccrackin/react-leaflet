var find = require("lodash-node/modern/collections/find");

var React = require("react");
var Leaflet = require("leaflet");

var eventsMixins = require("./mixins/events");

var bindTo = [
  "marker",
  "multiPolyline",
  "multiPolygon",
];

module.exports = React.createClass({
  displayName: "Popup",

  mixins: [eventsMixins("popup")],

  getInitialState() {
    return {popup: Leaflet.popup(this.props, this.props.layer)};
  },

  render() {
    if (this.props.children) {
      var content = React.renderToString(this.props.children);
      // Attach to parent component if in supported whitelist
      var el = find(bindTo, component => {
        return this.props[ component ];
      });
      if (el) {
        el.bindPopup(content);
        return null;
      }
      // Attach to a Map
      this.state.popup.setContent(content);
      if (this.props.position) this.state.popup.setLatLng(this.props.position);
      if (this.props.map) this.state.popup.openOn(this.props.map);
    }
    return null;
  }
});
