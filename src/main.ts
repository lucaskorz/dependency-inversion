import fastify from "fastify";
import { SESGateway } from "./gateways/SESGateway.js";
import { SQSGateway } from "./gateways/SQSGateway.js";
import { DynamoOrdersRepository } from "./repository/DynamoOrdersRepository.js";
import { PlaceOrder } from "./useCases/PlaceOrder.js";

const app = fastify();

app.post("/orders", async (request, reply) => {
  const dynamoOrdersRepository = new DynamoOrdersRepository();
  const sqsGateway = new SQSGateway();
  const sesGateway = new SESGateway();

  const placeHolder = new PlaceOrder(
    dynamoOrdersRepository,
    sqsGateway,
    sesGateway,
  );

  const { orderId } = await placeHolder.execute();

  reply.status(201).send({ orderId });
});

app.listen({ port: 3000 }).then(() => {
  console.log("> Server started at http://localhost:3000");
});
