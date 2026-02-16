import { Order } from '@/entities/Order.js';
import type { IEmailGateway } from '@/interfaces/gateways/IEmailGateway.js';
import type { IQueueGateway } from '@/interfaces/gateways/IQueueGateway.js';
import type { IOrdersRepository } from '@/interfaces/repositories/IOrdersRepository.js'
import { PlaceOrder } from '@/useCases/PlaceOrder.js'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

const ordersRepositoryMock = mock<IOrdersRepository>();
const queueGatewayMock = mock<IQueueGateway>();
const emailGatewayMock = mock<IEmailGateway>();

describe('PlaceOrder', () => {
  let sut: PlaceOrder;

  beforeEach(() => {
    sut = new PlaceOrder(ordersRepositoryMock, queueGatewayMock, emailGatewayMock);
  });

  it('must call the external modules', async () => {
    await sut.execute();

    expect(ordersRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(ordersRepositoryMock.create).toHaveBeenCalledWith(expect.any(Order));

    expect(queueGatewayMock.publishMessage).toHaveBeenCalledTimes(1);
    expect(queueGatewayMock.publishMessage).toHaveBeenCalledWith({ orderId: expect.any(String) });

    expect(emailGatewayMock.sendEmail).toHaveBeenCalledTimes(1);
    expect(emailGatewayMock.sendEmail).toHaveBeenCalledWith(expect.any(Object))
  })
})