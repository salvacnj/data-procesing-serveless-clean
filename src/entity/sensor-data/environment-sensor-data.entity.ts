import { BaseSensorData } from "./base-sensor.data.entity";

export class EnvironmentSensorData extends BaseSensorData {
  temperature : string;
  humidity: string;
  pressure: string;
  co2 : string;
  ppfd : string;
}