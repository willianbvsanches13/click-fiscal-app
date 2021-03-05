import * as cdk from "@aws-cdk/core";
import * as sst from "@serverless-stack/resources";
import DynamoDBStack from './DynamoDBStack';

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);
    const db = new DynamoDBStack(scope, 'dynamo-db');

    // Create the HTTP API
    const api = new sst.Api(this, "Api", {
      // customDomain: {},
      defaultFunctionProps: {
        environment: {
          tableName: db.table.dynamodbTable.tableName
        },
      },
      routes: {
        "GET /": "src/lambda.handler",
        "GET /frases": "src/lambda.index",
        "GET /frases/{id}": "src/lambda.show",
        "POST /frases": "src/lambda.store",
      },
    });

    api.attachPermissions([db.table]);

    // Show API endpoint in output
    new cdk.CfnOutput(this, "ApiEndpoint", {
      value: api.httpApi.apiEndpoint,
    });
  }
}
