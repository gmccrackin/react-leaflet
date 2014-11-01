jest.dontMock("../Map");
jest.dontMock("../mixins/events");

describe("Map", function() {
  var React, Map;

  beforeEach(function() {
    React = require("react");
    Map = React.createFactory(require("../Map"));
  });

  it("should initialize the map in the rendered container", function() {
    document.body.innerHTML = '<div id="test"></div>';
    var mapInstance = React.render(Map(), document.getElementById("test")),
      mapNode = mapInstance.getDOMNode();

    expect(mapNode._leaflet).toBe(true);
  });

  it("should set center and zoom props", function() {
    var center = [1.2, 3.4],
      zoom = 10;

    document.body.innerHTML = '<div id="test"></div>';
    var mapComponent = Map({center, zoom}),
      mapInstance = React.render(mapComponent, document.getElementById("test")),
      mapLeaflet = mapInstance.state.map;

    expect(mapLeaflet.getCenter().lat).toBe(center[0]);
    expect(mapLeaflet.getCenter().lng).toBe(center[1]);
    expect(mapLeaflet.getZoom()).toBe(zoom);
  });
});
