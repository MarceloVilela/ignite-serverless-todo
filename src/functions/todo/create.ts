import { APIGatewayProxyHandler } from "aws-lambda"
import { v4 as uuidv4 } from 'uuid';
import { document } from "../../utils/dynamodbClient";

interface ICreateToDo {
  title: string
  deadline: string
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userID } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateToDo;

  const id = String(uuidv4());
  const date = new Date(deadline);

  await document.put({
    TableName: "users_todos",
    Item: {
      id,
      user_id: userID,
      title,
      done: false,
      deadline: String(date)
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "ToDo created!",
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
}