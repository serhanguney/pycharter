import React, { useEffect } from "react";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken =
// "pk.eyJ1IjoieXVpdmFlIiwiYSI6ImNrbXJuOHFnYjAzN3kycG13eWY0ZHEybWQifQ.5o3lSEo-e1pdqFgvO5f-1Q";

export default function Destinations() {
  // const mapContainerRef = useRef(null);
  // const style = {
  //   height: 100,
  //   width: 100,
  //   backgroundColor: "red",
  // };
  // const Popup = <div style={style}>Returned test</div>;
  useEffect(() => {
    // const map = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    //   center: [-0.127758, 51.507351],
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   zoom: 12.5,
    // });
    //add marker
    // const marker = new mapboxgl.Marker()
    //   .setLngLat([-0.127758, 51.507351])
    //   .addTo(map);
    // const markerHeight = 50,
    //   markerRadius = 10,
    //   linearOffset = 25;
    // const popupOffsets = {
    //   top: [0, 0],
    //   "top-left": [0, 0],
    //   "top-right": [0, 0],
    //   bottom: [0, -markerHeight],
    //   "bottom-left": [
    //     linearOffset,
    //     (markerHeight - markerRadius + linearOffset) * -1,
    //   ],
    //   "bottom-right": [
    //     -linearOffset,
    //     (markerHeight - markerRadius + linearOffset) * -1,
    //   ],
    //   left: [markerRadius, (markerHeight - markerRadius) * -1],
    //   right: [-markerRadius, (markerHeight - markerRadius) * -1],
    // };
    // const popup = new mapboxgl.Popup({
    //   offset: popupOffsets,
    //   className: "my-class",
    // })
    //   .setLngLat([-0.127758, 51.507351])
    //   .setHTML(`${(<Popup />)}`)
    //   .setMaxWidth("300px")
    //   .addTo(map);
    // add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    // clean up on unmount
    // return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // <div
    //   className="map-container"
    //   ref={mapContainerRef}
    //   style={{ height: 800 }}
    // ></div>
    <main id="destinations">
      <p>Coming soon</p>
    </main>
  );
}
