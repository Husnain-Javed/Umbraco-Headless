
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/en/home",
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/*"
  },
  {
    "renderMode": 0,
    "route": "/*/home"
  },
  {
    "renderMode": 0,
    "route": "/*/lender"
  },
  {
    "renderMode": 0,
    "route": "/*/investor"
  },
  {
    "renderMode": 0,
    "route": "/*/aboutus"
  },
  {
    "renderMode": 0,
    "route": "/*/leaders"
  },
  {
    "renderMode": 0,
    "redirectTo": "/en/home",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 12264, hash: '83b04e8ba9c17c1e8ba6faa13d1f224d27d5cf9c5da8e4e6ee4a06a44b908138', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 12785, hash: 'f12dc62c7d5add639d65a792462cb889f5f374cfd2fcc2cef8cf89ffe22d326b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
