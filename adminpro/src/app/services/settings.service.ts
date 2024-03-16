import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const style =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', style);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }
  checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach((elemn) => {
      elemn.classList.remove('working');

      const btnTheme = elemn.getAttribute('data-theme');

      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      const currenTheme = this.linkTheme?.getAttribute('href');

      if (btnTheme === currenTheme) {
        elemn.classList.add('working');
      }
    });
  }
}
