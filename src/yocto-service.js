import './resources/yocto_api';
import './resources/yocto_temperature';
import { Store } from 'aurelia-store';
import {inject} from "aurelia-dependency-injection";

function addSensor(state, sensor) {
  const newState = Object.assign({}, state);
  newState['sensors'][sensor.name] = sensor;
  return newState;
}

const host = location.hostname;
const port = '4444';
const serial = 'THRMCPL1-159D3';

@inject(Store)
export class YoctoService {

  constructor(store) {
    this.store = store;
    this.store.registerAction('addSensor', addSensor);
  }

  async connectToHub() {
    let isSuccess;
    let msg;

    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub(host.concat(':', port), errmsg) !== YAPI.SUCCESS) {
      msg = 'Cannot contact VirtualHub:' + host + errmsg.msg;
      console.log(msg);
      isSuccess = false;
    } else {
      msg = 'Successfully connected to the VirtualHub: ' + host;
      console.log(msg);
      isSuccess = true;
      this.sensor1();
      this.sensor2();
    }
    return isSuccess;
  }

  async sensor1() {
    let sensorInterface1 = YTemperature.FindTemperature(serial + ".temperature1");
    if(await sensorInterface1.isOnline()) {
      let sensorName = await sensorInterface1.get_logicalName();
      let sensorTemp = await sensorInterface1.get_currentValue();
      let sensorUnit = await sensorInterface1.get_unit();
      let sensor = {
        name: sensorName,
        temp: parseInt(sensorTemp),
        unit: sensorUnit,
        image_path: './pork-shoulder.jpg'
      };


      this.store.dispatch('addSensor', sensor);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    await this.sensor1();
  }

  async sensor2() {
    let sensorInterface2 = YTemperature.FindTemperature(serial + ".temperature2");
    if(await sensorInterface2.isOnline()) {
      let sensorName = await sensorInterface2.get_logicalName();
      let sensorTemp = await sensorInterface2.get_currentValue();
      let sensorUnit = await sensorInterface2.get_unit();
      let sensor = {
        name: sensorName,
        temp: parseInt(sensorTemp),
        unit: sensorUnit,
        image_path: './smoker.jpg'
      };


      this.store.dispatch('addSensor', sensor);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    await this.sensor2();
  }

}
