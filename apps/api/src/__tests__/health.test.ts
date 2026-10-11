import { describe, expect, it } from 'vitest';
import { createApp } from '../app';

describe('GET /health', () => {
  it('returns { ok: true }', async () => {
    const res = await createApp().request('/health');

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
  });

  it('404s an unknown route', async () => {
    const res = await createApp().request('/nope');

    expect(res.status).toBe(404);
  });
});
