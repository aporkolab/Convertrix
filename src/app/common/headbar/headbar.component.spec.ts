import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Component } from '@angular/core';

import { HeadbarComponent } from './headbar.component';
import { Language } from '../../model/language';
import { TranslateService } from '../../service/translate.service';

@Component({ template: '<app-headbar />', imports: [HeadbarComponent] })
class HostComponent {}

describe('HeadbarComponent', () => {
  let harness: RouterTestingHarness;
  let translate: TranslateService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: HostComponent },
          { path: 'game', component: HostComponent },
        ]),
      ],
    });
    translate = TestBed.inject(TranslateService);
    harness = await RouterTestingHarness.create();
  });

  const links = (): HTMLAnchorElement[] =>
    Array.from(harness.routeNativeElement!.querySelectorAll('a.link'));
  const linkByText = (text: string): HTMLAnchorElement =>
    links().find((a) => a.textContent!.trim() === text)!;

  it('should toggle the responsive menu', async () => {
    await harness.navigateByUrl('/');
    const menu = harness.routeNativeElement!.querySelector('ul.menu')!;
    const toggle =
      harness.routeNativeElement!.querySelector<HTMLElement>('.toggle')!;

    expect(menu.classList).not.toContain('responsive');
    toggle.click();
    harness.detectChanges();
    expect(menu.classList).toContain('responsive');
    expect(toggle.classList).toContain('open');
    toggle.click();
    harness.detectChanges();
    expect(menu.classList).not.toContain('responsive');
  });

  it('should mark only the current page link as active', async () => {
    await harness.navigateByUrl('/game');
    expect(linkByText('Game').classList).toContain('active');
    expect(linkByText('Home').classList).not.toContain('active');
  });

  it('should switch the language', async () => {
    await harness.navigateByUrl('/');
    const spy = spyOn(translate, 'setLanguage').and.callThrough();

    linkByText('HU').click();
    expect(spy).toHaveBeenCalledWith(Language.HUNGARIAN);
    linkByText('EN').click();
    expect(spy).toHaveBeenCalledWith(Language.ENGLISH);
  });
});
