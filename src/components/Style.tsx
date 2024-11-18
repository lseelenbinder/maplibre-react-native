import {
  useMemo,
  useState,
  useEffect,
  type ReactElement,
  type ComponentType,
} from "react";

import BackgroundLayer, { type BackgroundLayerProps } from "./BackgroundLayer";
import CircleLayer, { type CircleLayerProps } from "./CircleLayer";
import FillExtrusionLayer, {
  type FillExtrusionLayerProps,
} from "./FillExtrusionLayer";
import FillLayer, { type FillLayerProps } from "./FillLayer";
import HeatmapLayer, { type HeatmapLayerProps } from "./HeatmapLayer";
import ImageSource from "./ImageSource";
import LineLayer, { type LineLayerProps } from "./LineLayer";
import RasterLayer, { type RasterLayerProps } from "./RasterLayer";
import RasterSource from "./RasterSource";
import ShapeSource from "./ShapeSource";
import SymbolLayer, { type SymbolLayerProps } from "./SymbolLayer";
import VectorSource from "./VectorSource";
import {
  type ExpressionField,
  type FilterExpression,
} from "../utils/MapLibreRNStyles";

function toCamelCase(s: string): string {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

// Patches the Mapbox Style Specification keys into the style props attributes:
// icon-allow-overlap -> iconAllowOverlap
function toCamelCaseKeys(
  oldObj: Record<string, unknown>,
): Record<string, unknown> {
  if (!oldObj) {
    return {};
  }
  const newObj: Record<string, unknown> = {};
  Object.keys(oldObj).forEach((key) => {
    const value = oldObj[key];
    if (key.includes("-")) {
      newObj[toCamelCase(key)] = value;
    } else {
      newObj[key] = value;
    }
  });
  return newObj;
}

type LayerProps =
  | CircleLayerProps
  | SymbolLayerProps
  | RasterLayerProps
  | LineLayerProps
  | FillLayerProps
  | FillExtrusionLayerProps
  | BackgroundLayerProps
  | HeatmapLayerProps;

function getLayerComponentType(
  layer: MapLibreJSONLayer,
): ComponentType<LayerProps> | null {
  const { type } = layer;

  switch (type) {
    case "circle":
      return CircleLayer;
    case "symbol":
      return SymbolLayer;
    case "raster":
      return RasterLayer;
    case "line":
      return LineLayer;
    case "fill":
      return FillLayer;
    case "fill-extrusion":
      return FillExtrusionLayer;
    case "background":
      return BackgroundLayer;
    case "heatmap":
      return HeatmapLayer;
  }

  console.warn(`Mapbox layer type '${type}' is not supported/`);

  return null;
}

interface MapLibreJSONLayer {
  type: string;
  paint: { [k: string]: unknown };
  layout: { [k: string]: unknown };
  source?: string;
  "source-layer"?: string;
  minzoom?: number;
  maxzoom?: number;
  filter?: FilterExpression;
  id: string;
}

function asLayerComponent(
  layer: MapLibreJSONLayer,
): ReactElement<LayerProps> | null {
  const LayerComponent = getLayerComponentType(layer);

  if (!LayerComponent) {
    return null;
  }

  const style = {
    ...toCamelCaseKeys(layer.paint),
    ...toCamelCaseKeys(layer.layout),
  };

  const layerProps: Partial<LayerProps> = {};

  if (layer.source) {
    layerProps.sourceID = layer.source;
  }
  if (layer["source-layer"]) {
    layerProps.sourceLayerID = layer["source-layer"];
  }
  if (layer.minzoom) {
    layerProps.minZoomLevel = layer.minzoom;
  }
  if (layer.maxzoom) {
    layerProps.maxZoomLevel = layer.maxzoom;
  }
  if (layer.filter) {
    layerProps.filter = layer.filter;
  }
  if (Object.keys(style).length) {
    layerProps.style = style;
  }

  return <LayerComponent key={layer.id} id={layer.id} {...layerProps} />;
}

interface MapLibreJSONSource {
  type: string;
  url?: string;
  tiles?: string[];
  minzoom?: number;
  maxzoom?: number;
  attribution?: string;
  scheme?: "xyz" | "tms";
  bounds?: number[];
  buffer?: number;
  tileSize?: number;
  coordinates?: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
  cluster?: boolean;
  clusterMaxZoom?: number;
  clusterMinPoints?: number;
  clusterRadius?: number;
  clusterProperties?: { [propertyName: string]: ExpressionField };
  data?: string | object;
  filter?: FilterExpression;
  generateId?: boolean;
  lineMetrics?: boolean;
  tolerance?: number;
}

type SourceProps = {
  url?: string;
  tileUrlTemplates?: string[];
  minZoomLevel?: number;
  maxZoomLevel?: number;
  attribution?: string;
  tms?: boolean;
};

function getTileSourceProps(source: MapLibreJSONSource): SourceProps {
  const sourceProps: Partial<SourceProps> = {};
  if (source.url) {
    sourceProps.url = source.url;
  }
  if (source.tiles) {
    sourceProps.tileUrlTemplates = source.tiles;
  }
  if (source.minzoom !== undefined) {
    sourceProps.minZoomLevel = source.minzoom;
  }
  if (source.maxzoom !== undefined) {
    sourceProps.maxZoomLevel = source.maxzoom;
  }
  if (source.attribution) {
    sourceProps.attribution = source.attribution;
  }
  if (source.scheme && source.scheme === "tms") {
    sourceProps.tms = true;
  }
  return sourceProps;
}

function getVectorSource(id: string, source: MapLibreJSONSource): ReactElement {
  const sourceProps = { ...getTileSourceProps(source) };
  return <VectorSource key={id} id={id} {...sourceProps} />;
}

function getRasterSource(id: string, source: MapLibreJSONSource): ReactElement {
  const sourceProps: SourceProps & { tileSize?: number } = {
    ...getTileSourceProps(source),
  };
  if (source.tileSize) {
    sourceProps.tileSize = source.tileSize;
  }
  return <RasterSource key={id} id={id} {...sourceProps} />;
}

function getImageSource(id: string, source: MapLibreJSONSource): ReactElement {
  const sourceProps = {
    url: source.url,
    coordinates: source.coordinates,
  };
  return <ImageSource key={id} id={id} {...sourceProps} />;
}

type ShapeSourceShape = (typeof ShapeSource.prototype.props)["shape"];

function getShapeSource(id: string, source: MapLibreJSONSource): ReactElement {
  const sourceProps: SourceProps & {
    shape?: ShapeSourceShape;
    cluster?: boolean;
    clusterRadius?: number;
    clusterMaxZoomLevel?: number;
    clusterProperties?: { [propertyName: string]: ExpressionField };
    buffer?: number;
    tolerance?: number;
    lineMetrics?: boolean;
  } = {};
  if (source.data && typeof source.data === "string") {
    sourceProps.url = source.data;
  } else if (source.data && typeof source.data === "object") {
    sourceProps.shape = source.data as ShapeSourceShape;
  }
  if (source.cluster !== undefined) {
    sourceProps.cluster = source.cluster;
  }
  if (source.clusterRadius !== undefined) {
    sourceProps.clusterRadius = source.clusterRadius;
  }
  if (source.maxzoom !== undefined) {
    sourceProps.maxZoomLevel = source.maxzoom;
  }
  if (source.clusterMaxZoom !== undefined) {
    sourceProps.clusterMaxZoomLevel = source.clusterMaxZoom;
  }
  if (source.clusterProperties !== undefined) {
    sourceProps.clusterProperties = source.clusterProperties;
  }
  if (source.buffer !== undefined) {
    sourceProps.buffer = source.buffer;
  }
  if (source.tolerance !== undefined) {
    sourceProps.tolerance = source.tolerance;
  }
  if (source.lineMetrics !== undefined) {
    sourceProps.lineMetrics = source.lineMetrics;
  }
  return <ShapeSource key={id} id={id} {...sourceProps} />;
}

function asSourceComponent(
  id: string,
  source: MapLibreJSONSource,
): ReactElement | null {
  switch (source.type) {
    case "vector":
      return getVectorSource(id, source);
    case "raster":
      return getRasterSource(id, source);
    case "image":
      return getImageSource(id, source);
    case "geojson":
      return getShapeSource(id, source);
  }

  console.warn(`MapLibre source type '${source.type}' is not supported`);

  return null;
}

interface MapLibreJSON {
  layers?: MapLibreJSONLayer[];
  sources?: { [key: string]: MapLibreJSONSource };
}

interface StyleProps {
  /**
   * A JSON object conforming to the schema described in the MapLibre Style Specification, or a URL to such JSON.
   */
  json?: MapLibreJSON | URL;
}

/**
 * Style is a component that automatically adds sources / layers to the map using MapLibre Style Spec.
 * Only [`sources`](https://maplibre.org/maplibre-gl-js-docs/style-spec/sources/) & [`layers`](https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/) are supported.
 * Other fields such as `sprites`, `glyphs` etc. will be ignored. Not all layer / source attributes from the style spec are supported, in general the supported attributes will be mentioned under https://github.com/maplibre/maplibre-react-native/tree/main/docs.
 *
 * TODO: Maintainer forking this project does not understand the above comment regarding what is supported.
 */
const Style = (props: StyleProps): ReactElement => {
  const [fetchedJson, setFetchedJson] = useState({});
  const json: MapLibreJSON =
    typeof props.json === "object" ? props.json : fetchedJson;

  // Fetch style when props.json is a URL
  useEffect(() => {
    const abortController = new AbortController();
    const fetchStyleJson = async (url: string): Promise<void> => {
      try {
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        const responseJson = await response.json();
        setFetchedJson(responseJson);
      } catch (error: unknown) {
        const e = error as { name?: string };
        if (e.name === "AbortError") {
          return;
        }
        throw e;
      }
    };
    if (typeof props.json === "string") {
      fetchStyleJson(props.json);
    }
    return function cleanup(): void {
      abortController.abort();
    };
  }, [props.json]);

  // Extract layer components from json
  const layerComponents = useMemo(() => {
    if (!json.layers) {
      return [];
    }
    return json.layers
      .map(asLayerComponent)
      .filter((x: ReactElement | null) => !!x);
  }, [json.layers]);

  // Extract source components from json
  const sourceComponents = useMemo(() => {
    const { sources } = json;
    if (!sources || !Object.keys(sources)) {
      return [];
    }
    return Object.entries(sources)
      .map(([id, source]) => asSourceComponent(id, source))
      .filter((x) => !!x);
  }, [json]);

  return (
    <>
      {sourceComponents}
      {layerComponents}
    </>
  );
};

export default Style;
