import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Icon } from "@rneui/themed";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as MapLibreExamples from "../examples";
import { default as MapHeader } from "../examples/common/MapHeader";
import { default as sheet } from "../styles/sheet";

const styles = StyleSheet.create({
  exampleList: {
    flex: 1,
  },
  exampleListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  exampleListItemBorder: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  exampleListLabel: {
    fontSize: 18,
  },
});

class ExampleItem {
  label: string;
  Component: any;

  constructor(label: string, Component: any) {
    this.label = label;
    this.Component = Component;
  }
}

class ExampleGroup {
  root: boolean;
  label: string;
  items: (ExampleGroup | ExampleItem)[];

  constructor(
    label: string,
    items: (ExampleGroup | ExampleItem)[],
    root = false,
  ) {
    this.root = root;
    this.label = label;
    this.items = items;
  }
}

const Examples = new ExampleGroup(
  "MapLibre React Native",
  [
    new ExampleItem("Bug Report Template", MapLibreExamples.BugReportPage),
    new ExampleGroup("Map", [
      new ExampleItem("Show Map", MapLibreExamples.ShowMap),
      new ExampleItem(
        "Show Map With Local Style.JSON",
        MapLibreExamples.ShowMapLocalStyle,
      ),
      new ExampleItem("Show Click", MapLibreExamples.ShowClick),
      new ExampleItem(
        "Show Region Did Change",
        MapLibreExamples.ShowRegionDidChange,
      ),
      new ExampleItem("Two Map Views", MapLibreExamples.TwoByTwo),
      new ExampleItem(
        "Create Offline Region",
        MapLibreExamples.CreateOfflineRegion,
      ),
      new ExampleItem(
        "Get Pixel Point in MapView",
        MapLibreExamples.PointInMapView,
      ),
      new ExampleItem(
        "Show and hide a layer",
        MapLibreExamples.ShowAndHideLayer,
      ),
      new ExampleItem("Change Layer Color", MapLibreExamples.ChangeLayerColor),
      new ExampleItem(
        "Source Layer Visiblity",
        MapLibreExamples.SourceLayerVisibility,
      ),
      new ExampleItem("Style JSON", MapLibreExamples.StyleJson),
      new ExampleItem("Set Tint Color", MapLibreExamples.SetTintColor),
    ]),
    new ExampleGroup("Camera", [
      new ExampleItem(
        "Fit (Bounds, Center/Zoom, Padding)",
        MapLibreExamples.Fit,
      ),
      new ExampleItem("Set Pitch", MapLibreExamples.SetPitch),
      new ExampleItem("Set Heading", MapLibreExamples.SetHeading),
      new ExampleItem("Fly To", MapLibreExamples.FlyTo),
      new ExampleItem("Restrict Bounds", MapLibreExamples.RestrictMapBounds),
      new ExampleItem(
        "Set User Tracking Modes",
        MapLibreExamples.SetUserTrackingModes,
      ),
      new ExampleItem("Yo Yo Camera", MapLibreExamples.YoYo),
      new ExampleItem(
        "Take Snapshot Without Map",
        MapLibreExamples.TakeSnapshot,
      ),
      new ExampleItem(
        "Take Snapshot With Map",
        MapLibreExamples.TakeSnapshotWithMap,
      ),
      new ExampleItem("Get Current Zoom", MapLibreExamples.GetZoom),
      new ExampleItem("Get Center", MapLibreExamples.GetCenter),
      new ExampleItem("Compass View", MapLibreExamples.CompassView),
    ]),

    new ExampleGroup("User Location", [
      new ExampleItem(
        "Follow User Location Alignment",
        MapLibreExamples.FollowUserLocationAlignment,
      ),
      new ExampleItem(
        "Follow User Location Render Mode",
        MapLibreExamples.FollowUserLocationRenderMode,
      ),
      new ExampleItem(
        "User Location Updates",
        MapLibreExamples.UserLocationUpdate,
      ),
      new ExampleItem(
        "User Location Displacement",
        MapLibreExamples.UserLocationDisplacement,
      ),

      new ExampleItem(
        "Set Preferred Frames Per Second\n(Android only)",
        MapLibreExamples.SetAndroidPreferredFramesPerSecond,
      ),
    ]),

    new ExampleGroup("Symbol/CircleLayer", [
      new ExampleItem("Custom Icon", MapLibreExamples.CustomIcon),
      new ExampleItem("Clustering EarthQuakes", MapLibreExamples.EarthQuakes),
      new ExampleItem(
        "Shape Source From Icon",
        MapLibreExamples.ShapeSourceIcon,
      ),
      new ExampleItem(
        "Data Driven Circle Colors",
        MapLibreExamples.DataDrivenCircleColors,
      ),
    ]),
    new ExampleGroup("Fill/RasterLayer", [
      new ExampleItem("GeoJSON Source", MapLibreExamples.GeoJSONSource),
      new ExampleItem(
        "Watercolor Raster Tiles",
        MapLibreExamples.WatercolorRasterTiles,
      ),
      new ExampleItem("Indoor Building Map", MapLibreExamples.IndoorBuilding),
      new ExampleItem("Query Feature Point", MapLibreExamples.QueryAtPoint),
      new ExampleItem(
        "Query Features Bounding Box",
        MapLibreExamples.QueryWithRect,
      ),
      new ExampleItem(
        "Custom Vector Source",
        MapLibreExamples.CustomVectorSource,
      ),
      new ExampleItem("Image Overlay", MapLibreExamples.ImageOverlay),
      new ExampleItem(
        "Choropleth Layer By Zoom Level",
        MapLibreExamples.ChoroplethLayerByZoomLevel,
      ),
    ]),
    new ExampleGroup("LineLayer", [
      new ExampleItem("GradientLine", MapLibreExamples.GradientLine),
    ]),
    new ExampleGroup("Annotations", [
      new ExampleItem(
        "Show Point Annotation",
        MapLibreExamples.ShowPointAnnotation,
      ),
      new ExampleItem(
        "Point Annotation Anchors",
        MapLibreExamples.PointAnnotationAnchors,
      ),
      new ExampleItem("Marker View", MapLibreExamples.MarkerView),
      new ExampleItem("Heatmap", MapLibreExamples.Heatmap),
      new ExampleItem("Custom Callout", MapLibreExamples.CustomCallout),
    ]),
    new ExampleGroup("Animations", [
      new ExampleItem("Animated Line", MapLibreExamples.AnimatedLine),
      new ExampleItem(
        "Animate Circle along Line",
        MapLibreExamples.AnimateCircleAlongLine,
      ),
    ]),
    new ExampleItem("Cache management", MapLibreExamples.CacheManagement),
  ],
  true,
);

function FlatMapExamples(
  example: ExampleGroup | ExampleItem,
  flattenedExamples: (ExampleGroup | ExampleItem)[] = [],
): (ExampleGroup | ExampleItem)[] {
  if (example instanceof ExampleGroup) {
    return [
      ...flattenedExamples,
      ...example.items.flatMap((example) => FlatMapExamples(example)),
      example,
    ];
  }

  return [...flattenedExamples, example];
}

const FlatExamples = FlatMapExamples(Examples);

interface ExampleListProps {
  navigation: any;
  route: any;
}

function ExampleList({ route, navigation }: ExampleListProps) {
  const { name } = route;
  const example =
    FlatExamples.find((examples) => examples.label === name) || Examples;

  const back =
    !(example instanceof ExampleGroup) || !example.root
      ? {
          onBack: () => {
            navigation.goBack();
          },
        }
      : {};

  function itemPress(item: any) {
    navigation.navigate(item.label);
  }

  function renderItem({ item }: { item: any }) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => itemPress(item)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Icon name="keyboard-arrow-right" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={sheet.matchParent}>
      <MapHeader label={example.label} {...back} />
      <View style={sheet.matchParent}>
        <FlatList
          style={styles.exampleList}
          data={example instanceof ExampleGroup ? example.items : []}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

function buildNavigationScreens(example: any, Stack: any) {
  if (example instanceof ExampleGroup) {
    return (
      <Stack.Screen
        key={example.label}
        name={example.label}
        component={ExampleList}
      />
    );
  }
  return (
    <Stack.Screen
      key={example.label}
      name={example.label}
      component={example.Component}
    />
  );
}

function Home() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Examples.label}
        screenOptions={{
          headerShown: false,
          transitionSpec: TransitionPresets.SlideFromRightIOS.transitionSpec,
        }}
      >
        {FlatExamples.map((example) => buildNavigationScreens(example, Stack))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
