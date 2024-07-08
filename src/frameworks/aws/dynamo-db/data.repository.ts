import { DataRepository } from "../../../adapters/repositories/data.repository";
import { DataEntity } from "../../../entity/data.entity";
import { ProcessDataUseCase } from "../../../usecase/process-data.use-case";
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME!;

export class DynamoDbDataRepository implements DataRepository {

  async save( data : any) {
    
    const processedData = ProcessDataUseCase.process(new DataEntity(data));

    await dynamoDb.put({
      TableName: tableName,
      Item: processedData
    }).promise();
  }
  
}