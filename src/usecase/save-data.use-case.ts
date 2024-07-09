import { DataRepository } from "../adapters/repositories/data.repository";
import { InputData } from "./interface/input-data.interface";

export class SaveDataUseCase {

  constructor (private dataRepository : DataRepository) {}

  async save(data : InputData[]) {
    await Promise.all(data.map(d => this.dataRepository.save(d)))
  }
}