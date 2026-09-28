import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ServicesModule } from './services/services.module.js';

@Module({
  imports: [ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
