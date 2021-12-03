import {inject} from 'aurelia-framework';
import { Store } from 'aurelia-store';

@inject(Store)
export class Settings {

    constructor(store) {
      this.store = store;
    }

    bind() {
      this.subscription = this.store.state.subscribe(
        (state) => {
          this.state = state;
        }
      );
    }
}
