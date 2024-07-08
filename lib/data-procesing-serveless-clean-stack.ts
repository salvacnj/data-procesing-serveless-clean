import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path = require("path");
import * as iot from "aws-cdk-lib/aws-iot";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";

export class DataProcesingServelessCleanStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deviceDataTable = new dynamodb.Table(this, "deviceDataTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const deviceRawDataTable = new dynamodb.Table(this, "deviceRawDataTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });


    const iotRole = new iam.Role(this, "IoTToDynamoDBRole", {
      assumedBy: new iam.ServicePrincipal("iot.amazonaws.com"),
    });

    iotRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["dynamodb:PutItem"],
        resources: [deviceRawDataTable.tableArn],
      })
    );
    iotRole.addManagedPolicy({managedPolicyArn: "arn:aws:iam::aws:policy/CloudWatchLogsFullAccess"})

    const lambdaFunction = new nodeLambda.NodejsFunction(
      this,
      "DataProcessorFunction",
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        entry: path.join(
          __dirname,
          "../src/frameworks/aws/lambda/data.handler.ts"
        ),
        environment: {
          TABLE_NAME: deviceDataTable.tableName,
        },
      }
    );

    deviceDataTable.grantWriteData(lambdaFunction);

    const logGroup = new logs.LogGroup(this, 'IoTRuleLogGroup', {
      retention: logs.RetentionDays.ONE_WEEK,
    });


    new iot.CfnTopicRule(this, "MqttToLambdaRule", {
      topicRulePayload: {
        actions: [
          {
            lambda: {
              functionArn: lambdaFunction.functionArn,
            },
          },
          {
            dynamoDBv2: {
              roleArn: iotRole.roleArn,
              putItem: {
                tableName: deviceRawDataTable.tableName,
              },
              
            },
          },
        ],
        sql: "SELECT newuuid() as id,topic(2) as deviceCode, topic(3) as variableCode, timestamp() as receivedAt, ts as timestamp , v as value  FROM 'data/+/+'",
        ruleDisabled: false,
        errorAction: {
          cloudwatchLogs: {
            logGroupName: logGroup.logGroupName,
            roleArn: iotRole.roleArn,
          },
        },
      },
    });

    lambdaFunction.addPermission("IoTInvoke", {
      principal: new cdk.aws_iam.ServicePrincipal("iot.amazonaws.com"),
    });
  }
}
