import { SensorType } from "../interface/sensor-type.interface";

export class BaseSensorData {
  deviceCode : string;
  timestamp : number;
  sensorType : SensorType;
  siteId? :string;
  greenhouseId?: string;
}