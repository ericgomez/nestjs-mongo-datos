import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 👈

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[], // 👈 inject TASKS el cual es un array de cualquier cosa
    private config: ConfigService, // 👈
  ) {} // 👈 Injectando API_KEY de manera segura

  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY'); // 👈 Recibiendo el valor tipandolo como string
    const name = this.config.get('DATABASE_NAME'); // 👈

    // Imprimos el valor de inyectado
    return `Hello World! ${apiKey} ${name}`;
  }
}
