import { DataRepository } from "../adapters/repositories/data.repository";
import { ProcessedDataEntity } from "../entity/processed-data.entity";

export class SaveDataUseCase {

  constructor (private dataRepository : DataRepository) {}

  async save(data : ProcessedDataEntity) {
    await this.dataRepository.save(data);
  }
}