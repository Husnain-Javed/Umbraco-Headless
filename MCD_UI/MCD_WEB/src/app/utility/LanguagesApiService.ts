// core/services/languages-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class LanguagesApiService {
  private http = inject(HttpClient);

  getLanguages() {
    
    return firstValueFrom(
      this.http.get<{ isoCode: string; name: string; isDefault: boolean }[]>(
        `${environment.apiUrl}Umbraco/Getlanguages`
      )
    );
  }
}