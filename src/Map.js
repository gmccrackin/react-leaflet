var React = require("react/addons");
var Leaflet = require("leaflet");

var Type = React.PropTypes;
var latlngType = require("./types/latlng");
var latlngListType = require("./types/latlngList");

var eventsMixins = require("./mixins/events");
var currentId = 0;

var Map = React.createClass({
  displayName: "Map",

  mixins: [eventsMixins("map")],

  statics: {
    uid: function() {
      return "map" + ++currentId;
    }
  },

  propTypes: {
    center: latlngType,
    id: Type.string,
    maxBounds: latlngListType,
    maxZoom: Type.number,
    minZoom: Type.number,
    zoom: Type.number
  },

  getInitialState() {
    return {
      id: this.props.id || Map.uid()
    };
  },

  componentDidMount() {
    var map = Leaflet.map(this.state.id, this.props);
    this.setState({map});
    this.bindEvents(this.state._events);
  },

  render() {
    var children = null;
    if (this.state.map) {
      children = React.Children.map(this.props.children, child => {
        return React.addons.cloneWithProps(child, {map: this.state.map});
      });
    }
    return <div id={this.state.id}>{children}</div>;
  }
});

module.exports = Map;
