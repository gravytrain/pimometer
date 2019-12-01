import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';
import { YoctoService } from './yocto-service'
import { observable } from "aurelia-binding";

@inject(Store, YoctoService)
export class Temperature {
  @observable state;
  temperatureAlert = true;

  constructor(store, service) {
    this.store = store;
    this.service = service;
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state
      }
    );
    this.service.connectToHub()
      .then((isSuccess) => {
        this.isSuccess = isSuccess;
      })
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  get sensorOneTarget() {
    return '';
  }

  get sensorTwoTarget() {
    return ''
  }

  stateChanged(newValue, oldValue) {
    this.temperatureAlert = Object.entries(newValue.sensors).length <= 0;
  }
}
