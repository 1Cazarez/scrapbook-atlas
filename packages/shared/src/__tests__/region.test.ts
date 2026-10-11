import { describe, expect, it } from 'vitest';
import type { Region, Scrapbook } from '../index';

// These are compile-time checks as much as runtime ones: if the exported types
// drift from the shape CLAUDE.md fixes, typecheck fails here first.
describe('region and scrapbook types', () => {
  it('describes a region pack with no place names in code', () => {
    const region: Region = {
      id: 'test-region',
      name: 'Test Region',
      bbox: [-10, -10, 10, 10],
      defaultCenter: { lng: 0, lat: 0 },
      defaultZoom: 6,
      seedScrapbooks: [
        {
          title: 'Somewhere',
          countryCode: 'ZZ',
          admin1Code: null,
          center: { lng: 1, lat: 2 },
          coverColor: '#e9744c',
        },
      ],
    };

    expect(region.bbox).toHaveLength(4);
    expect(region.seedScrapbooks[0]?.center).toEqual({ lng: 1, lat: 2 });
  });

  it('describes a placed scrapbook with a UTC timestamp', () => {
    const scrapbook: Scrapbook = {
      id: 'sb_1',
      title: 'Somewhere',
      regionId: 'test-region',
      countryCode: 'ZZ',
      admin1Code: null,
      center: { lng: 1, lat: 2 },
      coverColor: '#e9744c',
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    expect(new Date(scrapbook.createdAt).toISOString()).toBe(scrapbook.createdAt);
  });
});
