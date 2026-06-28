import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from '../utility/language.service';

export const localeGuard: CanActivateFn = (route) => {
  const languageService = inject(LanguageService);
  const router = inject(Router);

  const segment = route.paramMap.get('locale') ?? 'en';
  const langs = languageService.getAvailableLanguages();



  const isValid =
    langs.length === 0 ||
    langs.some(l => l.urlSegment === segment);



  if (!isValid) {
    const defaultSeg = languageService.getDefaultLanguage().urlSegment;

    router.navigateByUrl(`/${defaultSeg}`);
    return false;
  }

  languageService.setLanguageFromSegment(segment);

  return true;
};