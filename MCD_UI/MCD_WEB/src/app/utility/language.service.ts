import { Injectable, Inject, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { INITIAL_LOCALE } from './token/locale.token';
import { HttpService } from './http.service';
import { TranslationService } from './TranslationService';

export interface LanguageOption {
  isoCode: string;
  urlSegment: string;
  name: string;
  dir: 'ltr' | 'rtl';
  isDefault?: boolean;
}

export const SEGMENT_TO_ISO: Record<string, string> = {
  'en': 'en-US',
  'ar': 'ar-OM'
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
private languageReadySubject = new BehaviorSubject<boolean>(false);

languageReady$ = this.languageReadySubject.asObservable();
  // Static cache — survives across guard re-runs and navigation
  private static _cachedLanguages: LanguageOption[] = [
    // Hardcoded fallback — guard will NEVER see empty array
    { isoCode: 'en-US', urlSegment: 'en', name: 'English', dir: 'ltr', isDefault: true },
    { isoCode: 'ar-OM', urlSegment: 'ar', name: 'العربية', dir: 'rtl', isDefault: false }
  ];

  private currentLangSubject = new BehaviorSubject<LanguageOption>(
    LanguageService._cachedLanguages[0]
  );

  currentLang$ = this.currentLangSubject.asObservable();

constructor(
  @Inject(PLATFORM_ID) private platformId: object,
  @Optional() @Inject(INITIAL_LOCALE) initialLocale: string | null,
  private router: Router,
  private httpService : HttpService,
 private translationService : TranslationService

) {

  if (initialLocale) {
    this.currentLangSubject.next(this.buildOption(initialLocale));
  }

  if (isPlatformBrowser(this.platformId)) {

    const segment = window.location.pathname
      .split('/')
      .filter(Boolean)[0] ?? 'en';

    this.setLanguageFromSegment(segment);
  }
}

  // ─── Called once by APP_INITIALIZER ──────────────────────────────────────

  setAvailableLanguages(
    langs: { isoCode: string; name: string; isDefault: boolean }[]
  ): void {
    const mapped = langs.map(l => ({
      isoCode: l.isoCode,
      urlSegment: l.isoCode.split('-')[0].toLowerCase(),
      name: l.name,
      dir: l.isoCode.toLowerCase().startsWith('ar') ? 'rtl' : 'ltr',
      isDefault: l.isDefault
    }));

  
    // Update both instance and static cache
    // LanguageService._cachedLanguages = mapped;

    // Resolve language from current URL now that we have the full list
    this.initFromUrl();
    
  }

  // ─── Called by localeGuard ────────────────────────────────────────────────

  setLanguageFromSegment(segment: string): void {
        console.log("segment");
    console.log(segment);
    const isoCode = SEGMENT_TO_ISO[segment?.toLowerCase()] ?? 'en-US';
    const option =
      this.getAvailableLanguages().find(l => l.isoCode === isoCode) ??
      this.buildOption(isoCode);

    this.currentLangSubject.next(option);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = option.urlSegment;
      document.documentElement.dir = option.dir;
    }

     if(isPlatformBrowser(this.platformId)){
      this.changeCss(option.isoCode);
   }


     this.languageReadySubject.next(true);
  }

  // ─── Getters — always read from static cache ──────────────────────────────

  getCurrentLang(): LanguageOption {
   
    return this.currentLangSubject.value;
  }

  getAvailableLanguages(): LanguageOption[] {
    return LanguageService._cachedLanguages; // never empty
  }

  getDefaultLanguage(): LanguageOption {
    return (
      LanguageService._cachedLanguages.find(l => l.isDefault) ??
      this.buildOption('en-US')
    );
  }

  // ─── Language switcher ────────────────────────────────────────────────────

  switchLanguage(newSegment: string): void {
    // Set language immediately — don't wait for guard
    this.setLanguageFromSegment(newSegment);

    // Swap locale segment in current URL, keep rest of path
    const segments = this.router.url.split('/').filter(Boolean);
    segments[0] = newSegment;
    const newUrl = '/' + segments.join('/');


      if (isPlatformBrowser(this.platformId)) {
    window.location.href = newUrl;
  }
   // this.router.navigateByUrl(newUrl);
  }

  // ─── Programmatic navigation ──────────────────────────────────────────────

  navigateTo(path: string, extras?: NavigationExtras): void {
    const locale = this.getCurrentLang()?.urlSegment ?? 'en';
    const clean = path.replace(/^\//, '');
    const segments = clean.split('/');
    const knownLocales = this.getAvailableLanguages().map(l => l.urlSegment);

    const localePath = knownLocales.includes(segments[0])
      ? `/${locale}/${segments.slice(1).join('/')}`
      : `/${locale}/${clean}`;

    this.router.navigate([localePath], extras);
  }

  // ─── Private ──────────────────────────────────────────────────────────────

 private initFromUrl(): void {

  let segment = 'en';


  if (isPlatformBrowser(this.platformId)) {

    segment =
      window.location.pathname
      .split('/')
      .filter(Boolean)[0] ?? 'en';

  }


  const match = this.getAvailableLanguages()
    .find(x => x.urlSegment === segment);


  const resolved =
    match ?? this.getDefaultLanguage();


  this.currentLangSubject.next(resolved);


  if (isPlatformBrowser(this.platformId)) {
    document.documentElement.lang = resolved.urlSegment;
    document.documentElement.dir = resolved.dir;
  }
}

  private buildOption(isoCode: string): LanguageOption {
    const segment = isoCode.split('-')[0].toLowerCase();
    return {
      isoCode,
      urlSegment: segment,
      name: isoCode,
      dir: segment === 'ar' ? 'rtl' : 'ltr',
      isDefault: segment === 'en'
    };
  }


  changeCss(lang:string){
debugger;

       if(isPlatformBrowser(this.platformId)){
      const old = document.getElementById('lang-css');
  old?.remove();

  const link = document.createElement('link');

  link.id = 'lang-css';
  link.rel = 'stylesheet';

  link.href = lang === 'ar-OM'
      ? '/style-ar.css'
      : '/style.css';

  document.head.appendChild(link);
  this.GetTranslationsData();
   }


}


   GetTranslationsData() {
 
    this.httpService.GetAll('Umbraco/GetTranslations').subscribe((data) => {
      this.translationService.setTranslations(data);
      
    });

  }
}