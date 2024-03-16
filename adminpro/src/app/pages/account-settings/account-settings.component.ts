import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {
 

  constructor(private settingsSerivce: SettingsService) {

  }
  ngOnInit(): void {
    
  }

  changeTheme(theme: string) {
    this.settingsSerivce.changeTheme(theme);
    this.settingsSerivce.checkCurrentTheme();
  }

  
}
