import { inject, PLATFORM } from "aurelia-framework";
import { YoctoService } from './yocto-service'
import '../static/styles/styles.css';
require.context('../static/images', true);
@inject(YoctoService)
export class App {

  constructor(yoctoService) {
    this.service = yoctoService;
    this.isSuccess = false;
  }

  configureRouter(config, router) {
    config.title = 'Pimometer';
    config.map([
      { route: ['', 'temperature'], name: 'temperature', moduleId: PLATFORM.moduleName('temperature'), nav: true, title: 'Temperature' },
      { route: 'settings', name: 'settings', moduleId: PLATFORM.moduleName('settings'), nav: true, title: 'Settings' },
    ]);

    this.router = router;
  }

  activate() {
    this.service.connectToHub()
      .then((isSuccess) => {
        this.isSuccess = isSuccess;
        console.log('YoctoHub isSuccess: ', isSuccess);
      })
  }
}
