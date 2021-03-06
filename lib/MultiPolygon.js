var React = require("react");
var Leaflet = require("leaflet");

var latlngListType = require("./types/latlngList");
var popupContainerMixin = require("./mixins/popupContainer");

module.exports = React.createClass({
  displayName: "MultiPolygon",

  mixins: [popupContainerMixin],

  propTypes: {
    polygons: React.PropTypes.arrayOf(latlngListType).isRequired
  },

  componentWillMount:function() {
    var $__0=    this.props,map=$__0.map,polygons=$__0.polygons,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{map:1,polygons:1});
    this._leafletElement = Leaflet.multiPolygon(polygons, props);
  },

  componentDidUpdate:function(prevProps) {
    if (this.props.polygons !== prevProps.polygons) {
      this.getLeafletElement().setLatLngs(this.props.polygons);
    }
  }
});
