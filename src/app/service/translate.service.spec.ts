import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { TranslateService } from './translate.service';
import { Language } from '../model/language';

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    service = TestBed.inject(TranslateService);
  });

  it('should default to English', async () => {
    expect(await firstValueFrom(service.language$)).toBe(Language.ENGLISH);
    expect(await firstValueFrom(service.get('select_to_placeholder'))).toBe(
      'Select the item you want to convert to'
    );
  });

  it('should emit translations again when the language changes', () => {
    const values: string[] = [];
    service.get('select_from_placeholder').subscribe((v) => values.push(v));

    service.setLanguage(Language.HUNGARIAN);

    expect(values).toEqual([
      'Select the item you would like to convert',
      'Válaszd ki, hogy mit szeretnél átváltani',
    ]);
  });

  it('should fall back to the key for unknown texts', async () => {
    expect(await firstValueFrom(service.get('no_such_key'))).toBe(
      'no_such_key'
    );
  });
});
