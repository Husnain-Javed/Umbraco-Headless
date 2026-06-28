
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { LanguageService } from './language.service';


export const LanguageInterceptor: HttpInterceptorFn = (req, next) => {


 


  const languageService = inject(LanguageService);
    const lang = languageService.getCurrentLang(); 



    const cloned = req.clone({
    setHeaders: {
      'X-Language': lang.isoCode
    }
  });



  //   activeRequests++;
  // loaderService.show();

 return next(cloned);
  //   return next(cloned).pipe(
  //   finalize(() => {
  //     activeRequests--;
  //     if (activeRequests === 0) {
  //       loaderService.hide();
  //     }
  //   })
  // );
};