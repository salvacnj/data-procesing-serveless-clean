import { v4 as uuidv4 } from "uuid";

export class DataEntity {
  timestamp: number;
  value: any;
  variableCode: string;
  deviceCode: string;
  id: string = uuidv4();

  constructor(data: Partial<DataEntity> = {}) {
    this.timestamp = data.timestamp || Date.now(); 
    this.value = data.value;
    this.variableCode = data.variableCode || '';
    this.deviceCode = data.deviceCode || '';
    this.id = data.id || uuidv4();
  }
}
