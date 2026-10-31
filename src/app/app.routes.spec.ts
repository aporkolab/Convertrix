import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { routes } from './app.routes';
import { ContactComponent } from './page/contact/contact.component';
import { GameComponent } from './page/game/game.component';
import { HomeComponent } from './page/home/home.component';

describe('app routes', () => {
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    harness = await RouterTestingHarness.create();
  });

  it('should route the empty path to the home page', async () => {
    expect(await harness.navigateByUrl('/')).toBeInstanceOf(HomeComponent);
  });

  it('should route /game and /contact', async () => {
    expect(await harness.navigateByUrl('/game')).toBeInstanceOf(GameComponent);
    expect(await harness.navigateByUrl('/contact')).toBeInstanceOf(
      ContactComponent
    );
  });

  it('should redirect unknown paths to the home page', async () => {
    const page = await harness.navigateByUrl('/no-such-page');
    expect(page).toBeInstanceOf(HomeComponent);
    expect(TestBed.inject(Router).url).toBe('/');
  });
});
