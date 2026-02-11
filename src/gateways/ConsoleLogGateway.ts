import { Inject } from "../di/Inject.js";
import type { ILogGateway } from "../interfaces/gateways/ILogGateway.js";
import { SESGateway } from "./SESGateway.js";

export class ConsoleLogGateway implements ILogGateway {
  constructor(@Inject('EmailGateway') private readonly emailService: SESGateway) { }

  async log(logMessage: Record<string, unknown>): Promise<void> {
    console.log('Log Service:');
    console.log(JSON.stringify(logMessage, null, 2));
    console.log('Email service:', this.emailService);
  }
}