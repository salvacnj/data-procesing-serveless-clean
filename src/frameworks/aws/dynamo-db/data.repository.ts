import { DataRepository } from "../../../adapters/repositories/data.repository";
import { InputData } from "../../../usecase/interface/input-data.interface";
import { ProcessDataUseCase } from "../../../usecase/process-data.use-case";
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export class DynamoDbDataRepository implements DataRepository {

  async save( data : InputData) {
    
    const processedData = ProcessDataUseCase.process(data);

    // TODO: Limit to 25 items.
    await dynamoDb.batchWrite({
      RequestItems: {
        [tableName]: processedData.map((item) => ({
          PutRequest: {
            Item: item,
          },
        })),
      },
    }).promise();
  }
  
}