import { Component, OnInit } from '@angular/core';
import { Language } from '../../model/language';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.scss'],
  standalone: false,
})
export class HeadbarComponent implements OnInit {
  isMenuOpen = false;
  Language = Language;

  constructor(private readonly translate: TranslateService) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setLanguage(lang: Language) {
    this.translate.setLanguage(lang);
  }
}
