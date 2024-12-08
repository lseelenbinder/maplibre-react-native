import MapLibreGL from "@maplibre/maplibre-react-native";
import { useEffect, useState } from "react";

import TabBarView from "../../components/TabBarView";
import { sheet } from "../../styles/sheet";

const OPTIONS = [5, 10, 15].map((data) => ({ label: data + " FPS", data }));

export default function SetAndroidPreferredFramesPerSecond() {
  const [androidPreferredFramesPerSecond, setAndroidPreferredFramesPerSecond] =
    useState(OPTIONS[0]?.data);

  useEffect(() => {
    MapLibreGL.locationManager.start();

    return () => {
      MapLibreGL.locationManager.stop();
    };
  }, []);

  return (
    <TabBarView
      options={OPTIONS}
      onOptionPress={(_index, data) => {
        setAndroidPreferredFramesPerSecond(data);
      }}
    >
      <MapLibreGL.MapView style={sheet.matchParent}>
        <MapLibreGL.Camera followZoomLevel={16} followUserLocation />

        <MapLibreGL.UserLocation
          animated
          renderMode="native"
          androidPreferredFramesPerSecond={androidPreferredFramesPerSecond}
        />
      </MapLibreGL.MapView>
    </TabBarView>
  );
}
