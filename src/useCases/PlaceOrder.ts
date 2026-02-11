import { Inject } from "../di/Inject.js";
import { Order } from "../entities/Order.js";
import type { IEmailGateway } from "../interfaces/gateways/IEmailGateway.js";
import type { IQueueGateway } from "../interfaces/gateways/IQueueGateway.js";
import type { IOrdersRepository } from "../interfaces/repositories/IOrdersRepository.js";

export class PlaceOrder {
  constructor(
    @Inject('OrderRepository') private readonly dynamoRepository: IOrdersRepository,
    @Inject('QueueGateway') private readonly queueGateway: IQueueGateway,
    @Inject('EmailGateway') private readonly emailGateway: IEmailGateway,
  ) { }

  async execute() {
    const customerEmail = "lucaskorzdj@gmail.com";
    const amount = Math.ceil(Math.random() * 1000);

    const order = new Order(customerEmail, amount);

    await this.dynamoRepository.create(order);
    await this.queueGateway.publishMessage({ orderId: order.id });
    await this.emailGateway.sendEmail({
      from: "JStore <noreply@lucas.dev.br",
      to: [order.email],
      subject: `Pedido #${order.id} confirmado!`,
      html: `<h1>E ai, Lucas!</h1>
             <p>Passando aqui só para avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal no seu e-mail!</p>`,
    });

    return { orderId: order.id };
  }
}
