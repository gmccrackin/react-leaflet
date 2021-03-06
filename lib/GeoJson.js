var React = require("react");
var Leaflet = require("leaflet");

var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "GeoJson",

  mixins: [popupContainerMixin],

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState:function() {
    return {geoJson: Leaflet.geoJson(this.props.data, this.props)};
  },

  componentWillMount:function() {
    var $__0=    this.props,data=$__0.data,map=$__0.map,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{data:1,map:1});
    this._leafletElement = Leaflet.geoJson(data, props);
  }
});
