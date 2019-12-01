import { PLATFORM } from "aurelia-framework";
import '../static/styles/styles.css';
require.context('../static/images', true);

export class App {

  configureRouter(config, router) {
    config.title = 'Pimometer';
    config.map([
      { route: ['', 'temperature'], name: 'temperature',      moduleId: PLATFORM.moduleName('temperature'),      nav: true, title: 'Temperature' },
      { route: 'settings',         name: 'settings',        moduleId: PLATFORM.moduleName('settings'),        nav: true, title: 'Settings' },
    ]);

    this.router = router;
}
}
