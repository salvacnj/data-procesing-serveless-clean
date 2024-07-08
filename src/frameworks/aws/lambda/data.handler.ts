import {
  IoTHandler, IoTEvent,Context
} from "aws-lambda";
import { DynamoDbDataRepository } from "../dynamo-db/data.repository";

export const handler : IoTHandler  = async (
  event : IoTEvent,
  context : Context
) => {
  await new DynamoDbDataRepository().save(event)
};
