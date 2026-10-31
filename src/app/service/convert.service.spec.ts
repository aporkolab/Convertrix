import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { ConvertService } from './convert.service';
import { TranslateService } from './translate.service';
import { Language } from '../model/language';

describe('ConvertService', () => {
  let service: ConvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of items', async () => {
    const items = await firstValueFrom(service.getItems());
    expect(items.length).toBe(20);
    expect(new Set(items.map((i) => i.id)).size).toBe(20);
  });

  it('should localize items when the language changes', () => {
    const translate = TestBed.inject(TranslateService);
    const names: string[] = [];
    service.getItems().subscribe((items) => names.push(items[3].name));

    translate.setLanguage(Language.HUNGARIAN);

    expect(names).toEqual(['Eiffel Tower', 'Eiffel-torony']);
  });

  it('should compare items by length', () => {
    // Eiffel Tower (324m) vs average automobile (4.48056m)
    const result = service.compareItems(4, 1, 'length', 1);
    expect(result).toBeCloseTo(72.31, 2);
  });

  it('should compare items by weight', () => {
    // Oscar Academy Award (3.85kg) vs Turkish Angora cat (4kg)
    const result = service.compareItems(6, 7, 'weight', 1);
    expect(result).toBeCloseTo(0.96, 2);
  });

  it('should handle quantity', () => {
    // 2 Eiffel Towers vs average automobile
    const result = service.compareItems(4, 1, 'length', 2);
    expect(result).toBeCloseTo(144.62, 2);
  });

  it('should return 0 for unknown items, missing property or non-positive quantity', () => {
    expect(service.compareItems(999, 1, 'length', 1)).toBe(0);
    expect(service.compareItems(1, null, 'length', 1)).toBe(0);
    expect(service.compareItems(1, 2, null, 1)).toBe(0);
    expect(service.compareItems(1, 2, 'weight', 0)).toBe(0);
    expect(service.compareItems(1, 2, 'weight', -3)).toBe(0);
    expect(service.compareItems(1, 2, 'weight', NaN)).toBe(0);
  });

  it('should default the quantity to 1', () => {
    expect(service.compareItems(4, 1, 'length', undefined)).toBeCloseTo(
      72.31,
      2
    );
  });

  it('should return 0 instead of Infinity when the target has no size', () => {
    // Internet (id 12) has a length of 0
    expect(service.compareItems(1, 12, 'length', 1)).toBe(0);
  });
});
