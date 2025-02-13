import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElevatorModule } from './elevator/elevator.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule, ElevatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
