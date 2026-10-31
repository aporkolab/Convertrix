import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import {
  CONTACT_TEXT,
  ContactComponent,
  TYPE_SPEED,
  TYPE_START_DELAY,
} from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should wait before typing', fakeAsync(() => {
    fixture.detectChanges();
    tick(TYPE_START_DELAY - 1);
    expect(component.typed()).toBe('');
    fixture.destroy();
  }));

  it('should type the contact text one character at a time', fakeAsync(() => {
    fixture.detectChanges();
    tick(TYPE_START_DELAY);
    expect(component.typed()).toBe(CONTACT_TEXT.charAt(0));
    tick(TYPE_SPEED * 2);
    expect(component.typed()).toBe(CONTACT_TEXT.slice(0, 3));

    tick(TYPE_SPEED * CONTACT_TEXT.length);
    fixture.detectChanges();
    expect(component.typed()).toBe(CONTACT_TEXT);
    const code = (fixture.nativeElement as HTMLElement).querySelector('code')!;
    expect(code.textContent).toContain('https://github.com/APorkolab/');
  }));

  it('should stop typing once destroyed', fakeAsync(() => {
    fixture.detectChanges();
    tick(TYPE_START_DELAY);
    fixture.destroy();
    const typedBefore = component.typed();
    tick(TYPE_SPEED * 10);
    expect(component.typed()).toBe(typedBefore);
  }));
});
