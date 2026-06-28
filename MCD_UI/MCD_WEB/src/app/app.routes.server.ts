import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // All :locale routes → SSR on demand (Umbraco content is dynamic)
  {
    path: ':locale',
    renderMode: RenderMode.Server
  },
  {
    path: ':locale/**',
    renderMode: RenderMode.Server
  },
  // Catch-all
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];