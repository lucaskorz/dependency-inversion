import { Order } from "../entities/Order.js";
import { SESGateway } from "../gateways/SESGateway.js";
import { SQSGateway } from "../gateways/SQSGateway.js";
import { DynamoOrdersRepository } from "../repository/DynamoOrdersRepository.js";

export class PlaceOrder {
  constructor(
    private readonly dynamoRepository: DynamoOrdersRepository,
    private readonly sqsGateway: SQSGateway,
    private readonly sesGateway: SESGateway,
  ) {}

  async execute() {
    const customerEmail = "lucaskorzdj@gmail.com";
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    await this.dynamoRepository.create(order);
    await this.sqsGateway.publishMessage({ orderId: order.id });
    await this.sesGateway.sendEmail({
      from: "JStore <noreply@lucas.dev.br",
      to: [order.email],
      subject: `Pedido #${order.id} confirmado!`,
      html: `<h1>E ai, Lucas!</h1>
             <p>Passando aqui só para avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal no seu e-mail!</p>`,
    });

    return { orderId: order.id };
  }
}
