// core/directives/locale-router-link.directive.ts
import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from './language.service';


@Directive({
  selector: '[routerLink]', // intercepts ALL existing routerLink usages
  standalone: true
})
export class LocaleRouterLinkDirective implements OnInit, OnChanges {
  @Input() routerLink: string | any[] = '';

  private routerLinkInstance = inject(RouterLink);
  private languageService = inject(LanguageService);

  ngOnInit(): void {
    this.applyLocale();
  }

  ngOnChanges(): void {
    this.applyLocale();
  }

  private applyLocale(): void {
    const locale = this.languageService.getCurrentLang()?.urlSegment ?? 'en';
    const link = this.routerLink;

    if (Array.isArray(link)) {
      // e.g. ['/about', id] → ['/en/about', id]
      const [first, ...rest] = link;
      const prefixed = this.addLocale(first as string, locale);
      this.routerLinkInstance.routerLink = [prefixed, ...rest];
    } else if (typeof link === 'string') {
      // e.g. '/about' → '/en/about'
      this.routerLinkInstance.routerLink = this.addLocale(link, locale);
    }

    // Force RouterLink to pick up the new value
    (this.routerLinkInstance as any).ngOnChanges?.({});
  }

  private addLocale(path: string, locale: string): string {
    if (!path || path === '/') return `/${locale}`;

    // Already has locale prefix — don't double-add
    const segments = path.replace(/^\//, '').split('/');
    const knownLocales = this.languageService
      .getAvailableLanguages()
      .map(l => l.urlSegment);

    if (knownLocales.includes(segments[0])) {
      // Swap existing locale with current one
      segments[0] = locale;
      return '/' + segments.join('/');
    }

    // Add locale prefix
    return `/${locale}/${path.replace(/^\//, '')}`;
  }
}