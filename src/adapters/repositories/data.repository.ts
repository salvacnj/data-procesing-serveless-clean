import { InputData } from "../../usecase/interface/input-data.interface";

export interface DataRepository {
  save (data: InputData): Promise<void>;
}