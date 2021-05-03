import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apiKey: string) {} // 👈 Injectando API_KEY de manera segura

  getHello(): string {
    // Imprimos el valor de inyectado
    return `Hello World! ${this.apiKey}`;
  }
}
