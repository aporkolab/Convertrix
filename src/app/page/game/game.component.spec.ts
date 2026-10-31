import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ConvertService } from '../../service/convert.service';
import { Language } from '../../model/language';
import { TranslateService } from '../../service/translate.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let convertService: ConvertService;
  let translate: TranslateService;

  const AUTOMOBILE = 1;
  const EIFFEL_TOWER = 4;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    convertService = TestBed.inject(ConvertService);
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  const host = (): HTMLElement => fixture.nativeElement as HTMLElement;
  const terminal = (): HTMLElement | null =>
    host().querySelector('.hero__terminal');

  it('should list every item in both selects', () => {
    expect(component.items().length).toBe(20);
    // 20 items + the placeholder option
    expect(host().querySelectorAll('#from option').length).toBe(21);
    expect(host().querySelectorAll('#to option').length).toBe(21);
  });

  it('should show the localized placeholders', () => {
    expect(component.selectFromPlaceholder()).toBe(
      'Select the item you would like to convert'
    );
  });

  it('should not show a result until everything is selected', () => {
    component.fromId.set(EIFFEL_TOWER);
    component.toId.set(AUTOMOBILE);
    fixture.detectChanges();

    expect(component.finalResult()).toBe(0);
    expect(terminal()).toBeNull();
  });

  it('should compute and render the conversion', () => {
    const spy = spyOn(convertService, 'compareItems').and.callThrough();

    component.updateQuantity(2);
    component.fromId.set(EIFFEL_TOWER);
    component.toId.set(AUTOMOBILE);
    component.property.set('length');
    fixture.detectChanges();

    expect(component.finalResult()).toBeCloseTo(144.62, 2);
    expect(spy).toHaveBeenCalledWith(EIFFEL_TOWER, AUTOMOBILE, 'length', 2);
    const text = terminal()!.textContent!;
    expect(text).toContain('2 Eiffel Tower(s) length the same as 144.6248');
    expect(text).toContain('average automobile(s)');
    expect(text).toContain('Gustave Eiffel');
  });

  it('should treat an empty or invalid quantity as zero', () => {
    component.updateQuantity('');
    expect(component.quantity()).toBe(0);
    component.updateQuantity('abc');
    expect(component.quantity()).toBe(0);
    component.updateQuantity('3');
    expect(component.quantity()).toBe(3);
  });

  it('should keep the selection and localize it when the language changes', async () => {
    component.fromId.set(EIFFEL_TOWER);
    component.toId.set(AUTOMOBILE);
    component.property.set('weight');
    fixture.detectChanges();

    translate.setLanguage(Language.HUNGARIAN);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.firstElement()?.name).toBe('Eiffel-torony');
    expect(component.secondElement()?.name).toBe('átlagos személyautó');
    expect(terminal()!.textContent).toContain('Gustave Eiffel mérnökről');
    expect(
      (
        host().querySelector('#from') as HTMLSelectElement
      ).selectedOptions[0].textContent!.trim()
    ).toBe('Eiffel-torony');
  });

  it('should update the result when the quantity input changes', async () => {
    component.fromId.set(EIFFEL_TOWER);
    component.toId.set(AUTOMOBILE);
    component.property.set('length');
    fixture.detectChanges();
    await fixture.whenStable();

    const input = host().querySelector<HTMLInputElement>('#quantity')!;
    input.value = '3';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.quantity()).toBe(3);
    expect(component.finalResult()).toBeCloseTo(216.94, 2);
  });
});
