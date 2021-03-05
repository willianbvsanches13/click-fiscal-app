import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as uuid from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler(): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: "Hello World!",
    headers: { "Content-Type": "text/plain" },
  };
}

export async function index(): Promise<APIGatewayProxyResult> {
  const getParams = {
    TableName: process.env.tableName || '',
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };
  const results = await dynamoDb.query(getParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}

export async function show(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const phraseId =
    event.pathParameters && event.pathParameters.id
      ? event.pathParameters.id
      : '';


  const getParams = {
    TableName: process.env.tableName || '',
    Key: {
      userId: '123',
      phraseId: phraseId,
    }
  };
  const results = await dynamoDb.get(getParams).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Item),
  };
}

export async function store(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const data = JSON.parse(event.body || '');

  const params = {
    TableName: process.env.tableName || '',
    Item: {
      userId: "123",
      phraseId: uuid.v1(),
      phrase: data.phrase,
      createdAt: Date.now(),
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
}