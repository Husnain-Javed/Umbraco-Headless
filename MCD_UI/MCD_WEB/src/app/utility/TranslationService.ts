import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private translationsSubject = new BehaviorSubject<any>({});

  translations$ = this.translationsSubject.asObservable();


  // set translations from outside
  setTranslations(data: any) {
    this.translationsSubject.next(data);
  }


  get(key: string): string {
    const translations = this.translationsSubject.value;
    return translations[key] || key;
  }

}