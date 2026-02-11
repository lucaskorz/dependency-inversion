import type { Order } from "../../entities/Order.js";

export interface IOrdersRepository {
  create(order: Order): Promise<void>
}