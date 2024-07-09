import {
  IoTHandler, IoTEvent,Context
} from "aws-lambda";
import { DynamoDbDataRepository } from "../dynamo-db/data.repository";
import { InputData } from "../../../usecase/interface/input-data.interface";

export const handler : IoTHandler  = async (
  event : IoTEvent,
  context : Context
) => {
  await new DynamoDbDataRepository().save(<InputData>(event as unknown))
};
