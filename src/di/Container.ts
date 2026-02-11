import { ConsoleLogGateway } from "../gateways/ConsoleLogGateway.js";
import { SESGateway } from "../gateways/SESGateway.js";
import { SQSGateway } from "../gateways/SQSGateway.js";
import { DynamoOrdersRepository } from "../repository/DynamoOrdersRepository.js";
import { PlaceOrder } from "../useCases/PlaceOrder.js";
import { Registry } from "./Registry.js";

export const container = Registry.getInstance();

container.register('PlaceOrder', PlaceOrder);
container.register('OrderRepository', DynamoOrdersRepository);
container.register('EmailGateway', SESGateway);
container.register('QueueGateway', SQSGateway);
container.register('LogGateway', ConsoleLogGateway);