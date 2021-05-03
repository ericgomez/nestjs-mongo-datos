import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // 👈 Import ConfigType
import config from './config'; // 👈
@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[], // 👈 inject TASKS el cual es un array de cualquier cosa
    @Inject(config.KEY) private configService: ConfigType<typeof config>, // 👈 inject ConfigType
  ) {} // 👈 Injectando API_KEY de manera segura

  getHello(): string {
    const apiKey = this.configService.apiKey; // 👈 Obtenemos en valor tipado para apiKey
    const name = this.configService.database.name; // 👈 Obtenemos en valor tipado para database.name

    // Imprimos el valor de inyectado
    return `Hello World! ${apiKey} ${name}`;
  }
}
