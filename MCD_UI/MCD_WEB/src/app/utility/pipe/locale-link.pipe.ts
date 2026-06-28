// utility/locale-link.pipe.ts
import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../language.service';


@Pipe({
  name: 'localeLink',
  standalone: true,
  pure: false
})
export class LocaleLinkPipe implements PipeTransform {
  private languageService = inject(LanguageService);

  transform(path: string | any[]): string | any[] {
    const locale = this.languageService.getCurrentLang()?.urlSegment ?? 'en';

    if (Array.isArray(path)) {
      const [first, ...rest] = path;
      return [this.prefixPath(first, locale), ...rest];
    }

    return this.prefixPath(path as string, locale);
  }

  private prefixPath(path: string, locale: string): string {
    if (!path || path === '/') return `/${locale}`;

    const segments = path.replace(/^\//, '').split('/');
    const knownLocales = this.languageService
      .getAvailableLanguages()
      .map(l => l.urlSegment);

    if (knownLocales.includes(segments[0])) {
      segments[0] = locale;
      return '/' + segments.join('/');
    }

    return `/${locale}/${path.replace(/^\//, '')}`;
  }
}