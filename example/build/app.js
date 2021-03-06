(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/app.js":[function(require,module,exports){
var React = require("react");

var SimpleExample = require("./simple");
var EventsExample = require("./events");
var VectorLayersExample = require("./vector-layers");

var examples = (
  React.createElement("div", null, 
    React.createElement("h1", null, "React-Leaflet examples"), 
    React.createElement("h2", null, "Simple"), 
    React.createElement(SimpleExample, null), 
    React.createElement("h2", null, "Events"), 
    React.createElement(EventsExample, null), 
    React.createElement("h2", null, "Vector layers"), 
    React.createElement(VectorLayersExample, null)
  )
);

React.render(examples, document.getElementById("app"));

},{"./events":"/Users/paul/Dev/PaulLeCam/react-leaflet/example/events.js","./simple":"/Users/paul/Dev/PaulLeCam/react-leaflet/example/simple.js","./vector-layers":"/Users/paul/Dev/PaulLeCam/react-leaflet/example/vector-layers.js","react":"react"}],"/Users/paul/Dev/PaulLeCam/react-leaflet/example/events.js":[function(require,module,exports){
var React = require("react");
var $__0=     require("react-leaflet"),Map=$__0.Map,TileLayer=$__0.TileLayer,Marker=$__0.Marker,Popup=$__0.Popup;

module.exports = React.createClass({
  displayName: "EventsExample",

  getInitialState:function() {
    return {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };
  },

  handleClick:function() {
    this.refs.map.getLeafletElement().locate();
  },

  handleLocationFound:function(e) {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  },

  render:function() {
    var marker = null;
    if (this.state.hasLocation) {
      marker = (
        React.createElement(Marker, {position: this.state.latlng}, 
          React.createElement(Popup, null, 
            React.createElement("span", null, "You are here")
          )
        )
      );
    }

    return (
      React.createElement(Map, {ref: "map", 
        center: this.state.latlng, 
        zoom: 13, 
        onLeafletClick: this.handleClick, 
        onLeafletLocationfound: this.handleLocationFound}, 
        React.createElement(TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png", 
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"}
        ), 
        marker
      )
    );
  }
});

},{"react":"react","react-leaflet":"react-leaflet"}],"/Users/paul/Dev/PaulLeCam/react-leaflet/example/simple.js":[function(require,module,exports){
var React = require("react");
var $__0=     require("react-leaflet"),Map=$__0.Map,TileLayer=$__0.TileLayer,Marker=$__0.Marker,Popup=$__0.Popup;

module.exports = React.createClass({
  displayName: "SimpleExample",

  getInitialState:function() {
    return {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  },

  render:function() {
    var position = [this.state.lat, this.state.lng];
    return (
      React.createElement(Map, {center: position, zoom: this.state.zoom}, 
        React.createElement(TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png", 
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"}
        ), 
        React.createElement(Marker, {position: position}, 
          React.createElement(Popup, null, 
            React.createElement("span", null, "A pretty CSS3 popup. ", React.createElement("br", null), " Easily customizable.")
          )
        )
      )
    );
  }
});

},{"react":"react","react-leaflet":"react-leaflet"}],"/Users/paul/Dev/PaulLeCam/react-leaflet/example/vector-layers.js":[function(require,module,exports){
var React = require("react");
var $__0=    
        require("react-leaflet"),Circle=$__0.Circle,CircleMarker=$__0.CircleMarker,Map=$__0.Map,MultiPolygon=$__0.MultiPolygon,MultiPolyline=$__0.MultiPolyline,Polygon=$__0.Polygon,Polyline=$__0.Polyline,Popup=$__0.Popup,Rectangle=$__0.Rectangle,TileLayer=$__0.TileLayer;

module.exports = React.createClass({
  displayName: "VectorLayersExample",

  render:function() {
    var center = [51.505, -0.09];

    var polyline = [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.12]
    ];

    var multiPolyline = [
      [[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]],
      [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]]
    ];

    var polygon = [
      [51.515, -0.09],
      [51.52, -0.1],
      [51.52, -0.12]
    ];

    var multiPolygon = [
      [[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]],
      [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]]
    ];

    var rectangle = [
      [51.49, -0.08],
      [51.5, -0.06]
    ];

    return (
      React.createElement(Map, {center: center, zoom: 13}, 
        React.createElement(TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png", 
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"}
        ), 
        React.createElement(Circle, {center: center, radius: 200, fillColor: "blue"}), 
        React.createElement(CircleMarker, {center: [51.51, -0.12], radius: 20, color: "red"}, 
          React.createElement(Popup, null, 
            React.createElement("span", null, "Popup in CircleMarker")
          )
        ), 
        React.createElement(Polyline, {positions: polyline, color: "lime"}), 
        React.createElement(MultiPolyline, {polylines: multiPolyline, color: "lime"}), 
        React.createElement(Polygon, {positions: polygon, color: "purple"}), 
        React.createElement(MultiPolygon, {polygons: multiPolygon, color: "purple"}), 
        React.createElement(Rectangle, {bounds: rectangle, color: "black"})
      )
    );
  }
});

},{"react":"react","react-leaflet":"react-leaflet"}]},{},["./example/app.js"]);
