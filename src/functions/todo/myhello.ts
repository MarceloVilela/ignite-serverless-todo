import { APIGatewayProxyHandler } from "aws-lambda";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('debug', 'todo-create');

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Hello World Serverless",
    }),
  }
}