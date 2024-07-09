import { DataEntity } from "../entity/data.entity";
import { EnvironmentSensorData } from "../entity/sensor-data/environment-sensor-data.entity";
import { InputData } from "./interface/input-data.interface";

export class ProcessDataUseCase {
  static process(data : InputData,) : DataEntity[]  {

    if (data.sensorType === "environment") {
      return this.processEnvironment(<EnvironmentSensorData>data); 
    }

    return [new DataEntity({deviceCode: data.deviceCode, value: data,processedAt: new Date().getTime() })];
  }

  private static processEnvironment(data : EnvironmentSensorData){
    let baseEntity : Partial<DataEntity>= {deviceCode: data.deviceCode}
    return [
      new DataEntity({...baseEntity, variableCode: "temperature", value: Number(data.temperature)}),
      new DataEntity({...baseEntity, variableCode: "humidity", value: Number(data.humidity)}),
      new DataEntity({...baseEntity, variableCode: "co2", value: Number(data.co2)}),
      new DataEntity({...baseEntity, variableCode: "pressure", value: Number(data.pressure)}),
      new DataEntity({...baseEntity, variableCode: "ppfd", value: Number(data.ppfd)}),
    ]
  }
}