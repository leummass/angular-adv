import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent {

  constructor(private settingsService: SettingsService) {}
  ngOnInit(): void {
    customInitFunctions();
  }
}
