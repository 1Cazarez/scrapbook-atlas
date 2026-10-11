/** All coordinates in this project are WGS84 longitude/latitude, in that order. */
export type GeoPoint = {
  lng: number;
  lat: number;
};

/** [west, south, east, north], the order MapLibre and turf both expect. */
export type BBox = readonly [number, number, number, number];

/** An ISO 3166-1 alpha-2 country code, e.g. "US". */
export type CountryCode = string;

/** An ISO 3166-2 subdivision code without its country prefix, e.g. "GA". */
export type Admin1Code = string;
