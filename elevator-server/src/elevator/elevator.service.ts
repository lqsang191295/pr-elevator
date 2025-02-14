import { Injectable } from '@nestjs/common';
import { iElevator, iQueueElevatorPayload } from '../types/elevator.type';
import { Elevator } from './elevator';
import { MyGateway } from '../gateway/gateway';

@Injectable()
export class ElevatorService {
    private elevators: Elevator[] = []

    constructor() {
        this.initElevators()
    }

    initElevators() {
        for(let i =0 ; i < 3; i++) {
            const elevator = new Elevator()

            elevator.setId(i)
            elevator.initial()

            this.elevators.push(elevator)
        }

        const dataElevator: iElevator[] = []
        for(let i = 0 ; i < 3 ; i++) {
            const ele = this.elevators[i]

            dataElevator.push({
                id: ele.getId(),
                direction: ele.getDirection(),
                floor: ele.getFloor(),
                status: ele.getStatus(),
                queue: ele.getQueue()
            })
        }

        return dataElevator
    }

    addQueueElevator(payload: iQueueElevatorPayload): boolean {
        const fElevator = this.elevators.find((ele, _) =>{
            return ele.getId() === payload.id
        })

        if(!fElevator) return false

        if(!fElevator.getQueue()) fElevator.setQueue([])

        const fQueueElevator = fElevator.getQueue().find((queue, _) =>{
            return queue.direction === payload.direction && queue.floor === payload.floor
        }) 

        if(fQueueElevator) return false

        fElevator.addQueue({
            direction: payload.direction,
            floor: payload.floor
        })

        return true
    }

    public async moveElevator(id: number) {
        const fElevator = this.elevators.find((ele, _) =>{
            return ele.getId() === id
        })

        if (!fElevator) return

        const status = fElevator.getStatus()
        const queue = fElevator.getQueue()

        if (status !== 'IDLE') return

        if (!queue || queue.length === 0) {
            fElevator.reset() 
            return 
        }

        if (status === 'IDLE') {
            if (fElevator.getFloor() - queue[0].floor > 0) {
                fElevator.setDirection('DOWN')
            } else {
                fElevator.setDirection('UP')
            }
        }

        while(fElevator.getQueue().length > 0) {
            await fElevator.move()
            MyGateway.getInstance().onUpdateElevator(fElevator.getDataElevator())
            await fElevator.open()
            MyGateway.getInstance().onUpdateElevator(fElevator.getDataElevator())
            await fElevator.close()
            MyGateway.getInstance().onUpdateElevator(fElevator.getDataElevator())
            await fElevator.oppositeDirection() 
        }

        fElevator.reset()
    }
}
