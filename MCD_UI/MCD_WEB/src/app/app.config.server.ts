import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { INITIAL_LOCALE } from './utility/token/locale.token';

import { mergeApplicationConfig, ApplicationConfig, inject, REQUEST_CONTEXT } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';



const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: INITIAL_LOCALE,
      useFactory: () => {
        // REQUEST_CONTEXT is the object passed from server.ts requestContext: { isoCode }
        const ctx = inject(REQUEST_CONTEXT) as { isoCode?: string } | null;
        return ctx?.isoCode ?? 'en-US';
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
