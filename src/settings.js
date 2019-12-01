import {inject} from 'aurelia-framework';
import {SettingsService} from 'settings-service';

@inject(SettingsService)
export class Settings {
    heading = 'Settings';

    constructor(service) {
      this.service = service;
    }

    saveSettings(form) {
        console.log(form);
    }
}
