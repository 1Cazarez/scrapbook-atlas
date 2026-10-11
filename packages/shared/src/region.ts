import type { BBox, GeoPoint } from './geo';
import type { SeedScrapbook } from './scrapbook';

/**
 * A region pack. Adding a country must mean adding one of these as JSON plus
 * boundary data, with no code changes — so nothing outside a pack may name a
 * place. See CLAUDE.md.
 */
export type Region = {
  id: string;
  name: string;
  bbox: BBox;
  defaultCenter: GeoPoint;
  defaultZoom: number;
  seedScrapbooks: readonly SeedScrapbook[];
};
