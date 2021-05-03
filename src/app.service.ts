import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[], // 👈 inject TASKS el cual es un array de cualquier cosa
  ) {} // 👈 Injectando API_KEY de manera segura

  getHello(): string {
    console.log(this.tasks); // 👈 print TASKS

    // Imprimos el valor de inyectado
    return `Hello World! ${this.apiKey}`;
  }
}
