import * as sst from "@serverless-stack/resources";

export default class DynamoDBStack extends sst.Stack {
  public table: sst.Table;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    this.table = new sst.Table(this, "Frases3", {
      fields: {
        userId: sst.TableFieldType.STRING,
        phraseId: sst.TableFieldType.STRING,
        phrase: sst.TableFieldType.STRING,
      },
      primaryIndex: {
        partitionKey: 'userId',
        sortKey: 'phraseId',
      },
    });
  }
}