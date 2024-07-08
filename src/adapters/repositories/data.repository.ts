import { DataEntity } from "../../entity/data.entity";

export interface DataRepository {
  save (data: DataEntity): Promise<void>;
}