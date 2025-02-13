import { forwardRef, Module } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { ElevatorController } from './elevator.controller';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [forwardRef(() => GatewayModule)],
  providers: [ElevatorService],
  controllers: [ElevatorController],
  exports: [ElevatorService]
})
export class ElevatorModule {}
