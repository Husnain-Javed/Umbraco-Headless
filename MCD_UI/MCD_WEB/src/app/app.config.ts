import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { LanguageInterceptor } from './utility/LanguageInterceptor';
import { LanguagesApiService } from './utility/LanguagesApiService';
import { LanguageService } from './utility/language.service';
import { loaderInterceptor } from './utility/loaderInterceptor';

function initLanguages(languagesApi: LanguagesApiService, languageService: LanguageService) {
  return () =>
    languagesApi.getLanguages().then(langs => 
      
      languageService.setAvailableLanguages(langs));
}


export const appConfig: ApplicationConfig = {
  providers: [
     CookieService,
  provideHttpClient(withFetch(), withInterceptors([LanguageInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initLanguages,
      deps: [LanguagesApiService, LanguageService],
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
