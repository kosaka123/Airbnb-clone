import Image from "next/image";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { MapPin } from "react-feather";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //transform the search results object into the
  //{latitude:52，longtitude:5252525}
  //object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //the latitude and longtitude of the center of locations coordinates
  const center = getCenter(coordinates);
  //console.log("center:", center);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ongkim/cks5ptxpd60mx17p63ip78saz"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
            >
              <MapPin color="red" background="red" />
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              <div className=" flex flex-col w-[200px] h-[200px] z-50">
                <div className="relative h-[100%] w--[100%]">
                  <Image
                    src={result.img}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>

                <div className="">
                  <h1 className="pt-2 font-semibold">{result.title}</h1>
                  <h2 className="text-sm">{result.price}</h2>
                </div>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
