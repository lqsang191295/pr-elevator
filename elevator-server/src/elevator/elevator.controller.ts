import { Controller, Get } from '@nestjs/common';
import { ElevatorService } from './elevator.service';

@Controller('elevator')
export class ElevatorController {
    constructor(private elevatorService: ElevatorService) {}

   @Get('/initial')
   initialElevator() {
    return this.elevatorService.initElevators()
   }
}
