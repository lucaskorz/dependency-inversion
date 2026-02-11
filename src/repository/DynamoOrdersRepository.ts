import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { Order } from "../entities/Order.js";
import type { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository.js";
import type { ILogGateway } from "../interfaces/gateways/ILogGateway.js";
import { Inject } from "../di/Inject.js";

export class DynamoOrdersRepository implements IOrdersRepository {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor(@Inject('LogGateway') private readonly logGateway: ILogGateway) { }

  async create(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: "Orders",
      Item: {
        id: order.id,
        email: order.email,
        amount: order.amount,
      },
    });

    await this.logGateway.log({ ...order });

    await this.client.send(command);
  }
}
