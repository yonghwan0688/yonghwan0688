"use strict";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require("uuid");

// 수정: 올바른 클라이언트 생성
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const USERS_TABLE = "Users";

exports.getUser = async (event) => {
  const id = event.pathParameters.id;
  const result = await ddb.send(
    new GetCommand({
      TableName: USERS_TABLE,
      Key: { id },
    })
  );

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify(
        {
          message: `User not found`,
        },
        null,
        2
      ),
    };
  }

  // 수정: 변수 정의 추가
  const queryParams = event.queryStringParameters || {};
  const userType = queryParams.userType || "default";

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `User ID: ${id}, User Type: ${userType}`, // userId -> id
        user: result.Item,
      },
      null,
      2
    ),
  };
};

exports.createUser = async (event) => {
  const body = JSON.parse(event.body);
  const id = uuidv4();
  const user = { id, ...body };

  await ddb.send(
    new PutCommand({
      TableName: USERS_TABLE,
      Item: user,
    })
  );

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: `User created successfully`,
        user: { name: body.name, email: body.email }, // 수정: body에서 추출
      },
      null,
      2
    ),
  };
};

exports.updateUser = async (event) => {
  const id = event.pathParameters.id;
  const body = JSON.parse(event.body);

  const result = await ddb.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression: "set #name = :name, #email = :email",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email",
      },
      ExpressionAttributeValues: {
        ":name": body.name,
        ":email": body.email,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `User updated successfully`,
      user: result.Attributes,
    }),
  };
};

exports.deleteUser = async (event) => {
  const id = event.pathParameters.id;

  await ddb.send(
    new DeleteCommand({
      TableName: USERS_TABLE,
      Key: { id },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `User deleted successfully`,
    }),
  };
};
