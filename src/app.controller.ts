import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); // Utilizamos el servicio
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  // Creamos una nueva Ruta
  @Get('/tasks/') // 👈 New endpoint
  getTasks() {
    return this.appService.getTasks(); // Vamo a appService y ejecutamos el metodo getTasks
  }
}
