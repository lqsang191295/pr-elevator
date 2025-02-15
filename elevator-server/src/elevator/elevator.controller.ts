import { Body, Controller, Get, Post } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { iQueueElevatorPayload } from '../types/elevator.type';

@Controller('elevator')
export class ElevatorController {
    constructor(private elevatorService: ElevatorService) {}

   @Get('initial')
   initialElevator() {
    return this.elevatorService.initElevators()
   }

   @Post('callElevator')
   callElevator(@Body() body: iQueueElevatorPayload) {
    console.log('B00000000000000  ------ ', body.id)

    const result = this.elevatorService.addQueueElevator(body);

    if (!result) return;

    this.elevatorService.moveElevator(body.id);
   }
}
