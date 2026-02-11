import type { IEmailGateway } from "../interfaces/gateways/IEmailGateway.js";

export class ResendGateway implements IEmailGateway {
  sendEmail(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}