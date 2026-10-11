import { Hono } from 'hono';

/**
 * The app is built separately from the server so tests can call routes
 * directly with `app.request()` without opening a port.
 *
 * Every secret this project uses lives in this app's environment, never in the
 * mobile app. Routes are added in the milestone that first needs them.
 */
export function createApp() {
  const app = new Hono();

  app.get('/health', (c) => c.json({ ok: true }));

  return app;
}

export type AppType = ReturnType<typeof createApp>;
