import type { Admin1Code, CountryCode, GeoPoint } from './geo';

/**
 * One scrapbook standing on the map.
 *
 * Server-owned columns (userId, shareSlug, isPublic) arrive in Milestone 3
 * along with the database; this is the shape the map and bottom sheet render.
 * `createdAt` is an ISO 8601 string in UTC.
 */
export type Scrapbook = {
  id: string;
  title: string;
  regionId: string;
  countryCode: CountryCode;
  admin1Code: Admin1Code | null;
  center: GeoPoint;
  coverColor: string;
  createdAt: string;
};

/** A scrapbook as it appears in a region pack, before it is given an id. */
export type SeedScrapbook = Pick<
  Scrapbook,
  'title' | 'countryCode' | 'admin1Code' | 'center' | 'coverColor'
>;
