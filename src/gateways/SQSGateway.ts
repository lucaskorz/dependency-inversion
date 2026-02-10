import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export class SQSGateway {
  private client = new SQSClient();

  async publishMessage(message: Record<string, unknown>): Promise<void> {
    const command = new SendMessageCommand({
      QueueUrl:
        "https://sqs.us-east-1.amazonaws.com/230088760678/ProcessPaymentQueue",
      MessageBody: JSON.stringify(message),
    });

    await this.client.send(command);
  }
}
