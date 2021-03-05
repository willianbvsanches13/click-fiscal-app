import MyStack from "./MyStack";
// import DynamoDBStack from './DynamoDBStack';

import * as sst from "@serverless-stack/resources";

export default function main(app: sst.App): void {
  // new DynamoDBStack(app, 'dynamo-db');
  new MyStack(app, "my-stack");

  // Add more stacks
}
