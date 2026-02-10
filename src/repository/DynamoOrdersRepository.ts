import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { Order } from "../entities/Order.js";

export class DynamoOrdersRepository {
  private client = DynamoDBDocumentClient.from(new DynamoDBClient());

  async create(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: "Orders",
      Item: {
        id: order.id,
        email: order.email,
        amount: order.amount,
      },
    });

    await this.client.send(command);
  }
}
