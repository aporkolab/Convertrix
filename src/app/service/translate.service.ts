import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Language } from '../model/language';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private readonly language = new BehaviorSubject<Language>(Language.ENGLISH);
  readonly language$ = this.language.asObservable();

  private readonly translations: Record<Language, Record<string, string>> = {
    [Language.ENGLISH]: {
      select_from_placeholder: 'Select the item you would like to convert',
      select_to_placeholder: 'Select the item you want to convert to',
    },
    [Language.HUNGARIAN]: {
      select_from_placeholder: 'Válaszd ki, hogy mit szeretnél átváltani',
      select_to_placeholder: 'Válaszd ki, hogy mire szeretnéd átváltani',
    },
  };

  setLanguage(language: Language): void {
    this.language.next(language);
  }

  get(key: string): Observable<string> {
    return this.language$.pipe(
      map((language) => this.translations[language][key] || key)
    );
  }
}
