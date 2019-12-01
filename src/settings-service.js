export class SettingsService {
  sensorOneName = localStorage.getItem('sensor-one-name') || 'Sensor 1';
  sensorTwoName = localStorage.getItem('sensor-two-name') || 'Sensor 2';
  sensorOneTarget = localStorage.getItem('sensor-one-target') || '-';
  sensorTwoTarget = localStorage.getItem('sensor-two-target') || '-';
}
