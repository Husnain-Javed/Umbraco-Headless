// utility/loader.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  show(): void {
    this.loadingSubject.next(true);
    if (isPlatformBrowser(this.platformId)) {
      const loader = this.document.getElementById('app-loader');
      loader?.classList.remove('hidden');
    }
  }

  hide(): void {
    this.loadingSubject.next(false);
    if (isPlatformBrowser(this.platformId)) {
      const loader = this.document.getElementById('app-loader');
      loader?.classList.add('hidden');
    }
  }
}