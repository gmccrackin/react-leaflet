var React = require("react");
var {Map, TileLayer, Marker, Popup} = require("react-leaflet");

module.exports = React.createClass({
  displayName: "SimpleExample",
  render() {
    var position = [51.505, -0.09];
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <p>
              <strong>Hello</strong>
              <em> World</em>
            </p>
          </Popup>
        </Marker>
      </Map>
    );
  }
});
