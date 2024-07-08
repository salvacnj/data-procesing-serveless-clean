import { DataEntity } from "../entity/data.entity";

export class ProcessDataUseCase {
  static process(data : DataEntity)  {
    return {...data, processedAt: new Date().getTime() };
  }
}