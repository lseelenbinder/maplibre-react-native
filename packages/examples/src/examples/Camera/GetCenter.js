import MapLibreGL from "@maplibre/maplibre-react-native";
import React from "react";
import { Text } from "react-native";

import Bubble from "../common/Bubble";
import Page from "../common/Page";

const styles = {
  mapView: { flex: 1 },
};

class GetCenter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [],
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
  }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    this.setState({ center });
  }

  getLng() {
    const { center } = this.state;
    return center.length === 2 ? `Lng: ${center[0]}` : "Not available";
  }

  getLat() {
    const { center } = this.state;
    return center.length === 2 ? `Lat: ${center[1]}` : "Not available";
  }

  render() {
    return (
      <Page>
        <MapLibreGL.MapView
          onRegionDidChange={this.onRegionDidChange}
          ref={(c) => (this._map = c)}
          onPress={this.onPress}
          style={styles.mapView}
        >
          <MapLibreGL.Camera
            zoomLevel={9}
            centerCoordinate={[-73.970895, 40.723279]}
          />
        </MapLibreGL.MapView>

        <Bubble>
          <Text>Center</Text>
          <Text>{this.getLng()}</Text>
          <Text>{this.getLat()}</Text>
        </Bubble>
      </Page>
    );
  }
}

export default GetCenter;
