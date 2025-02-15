import { forwardRef, Global, Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { ElevatorModule } from '../elevator/elevator.module';

@Global()
@Module({
  imports: [forwardRef(() => ElevatorModule)],
  providers: [MyGateway],
  exports: [MyGateway]
})
export class GatewayModule {}