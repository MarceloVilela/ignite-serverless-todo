import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userID } = event.pathParameters;

  const response = await document.scan({
    TableName: "users_todos",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userID
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todos encontrados!",
      user_id: userID,
      todos: response
    })
  };
}