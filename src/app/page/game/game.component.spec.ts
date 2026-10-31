/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GameComponent } from './game.component';
import { ConvertService, PropKind } from '../../service/convert.service';
import { Item } from '../../model/item';
import { TranslateService } from '../../service/translate.service';

class MockTranslateService {
  get(key: string): Observable<string> {
    return of(key);
  }
}

class MockConvertService {
  private readonly items: readonly Item[] = [
    new Item(1, 'Item 1', 10, 10, 'desc 1'),
    new Item(2, 'Item 2', 20, 20, 'desc 2'),
  ];

  getItems(): Observable<readonly Item[]> {
    return of(this.items);
  }

  getItem(id: number): Observable<Item | undefined> {
    return of(this.items.find((item) => item.id === id));
  }

  compareItems(
    _item1: number | null | undefined,
    _item2: number | null | undefined,
    _which: PropKind | null | undefined,
    _quantity: number | null | undefined
  ): number {
    return 42;
  }
}

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let convertService: ConvertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [FormsModule], // ngModel miatt
      providers: [
        { provide: ConvertService, useClass: MockConvertService },
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    convertService = TestBed.inject(ConvertService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items from ConvertService on init', () => {
    component.listOfAllCard$.subscribe((items) => {
      expect(items.length).toBe(2);
    });
  });

  it('should call ConvertService.compareItems with proper args and update finalResult', () => {
    const spy = spyOn(convertService, 'compareItems').and.callThrough();

    // beállítások
    component.property = 'length';
    component.updateQuantity(3);
    component.setFrom(1);
    component.setTo(2);

    // explicit újraszámítás (stabil ellenőrzéshez)
    component.recompute();

    expect(spy).toHaveBeenCalledWith(1, 2, 'length', 3);
    expect(component.finalResult).toBe(42);
  });
});
