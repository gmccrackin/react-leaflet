jest.dontMock("../Map");
jest.dontMock("../mixins/events");

describe("Events", function() {
  it("should bind the event", function() {
    var React = require("react"),
      Map = React.createFactory(require("../Map"));

    document.body.innerHTML = '<div id="test"></div>';

    var callback = jest.genMockFn(),
      mapComponent = Map({onLeafletClick: callback}),
      mapInstance = React.render(mapComponent, document.getElementById("test"));

    mapInstance.fireEvent("click");
    expect(callback.mock.calls.length).toBe(1);
  });
});
