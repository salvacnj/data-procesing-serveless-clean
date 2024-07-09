import { v4 as uuidv4 } from "uuid";
import { SensorType } from "./interface/sensor-type.interface";

export class DataEntity {
  timestamp: number;
  value: any;
  variableCode: string;
  sensorType : SensorType;
  deviceCode: string;
  id: string = uuidv4();
  processedAt : number;

  constructor(data: Partial<DataEntity> = {}) {
    this.timestamp = data.timestamp || Date.now(); 
    this.value = data.value;
    this.variableCode = data.variableCode || '';
    this.deviceCode = data.deviceCode || '';
    this.id = data.id || uuidv4();
    this.processedAt = Date.now();
  }
}
