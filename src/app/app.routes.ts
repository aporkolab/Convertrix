import { Routes } from '@angular/router';
import { ContactComponent } from './page/contact/contact.component';
import { GameComponent } from './page/game/game.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: '' },
];
