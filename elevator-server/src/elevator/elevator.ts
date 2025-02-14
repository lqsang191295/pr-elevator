import { DIRECTION, iElevator, iQueueElevator, STATUS } from "src/types/elevator.type"
import { sleepAsync } from "src/utils/time"
import { MyGateway } from "src/gateway/gateway"

export class Elevator {
    private id: number
    private floor: number
    private status: STATUS 
    private direction: DIRECTION
    private queue: iQueueElevator[]

    setId(id: number) {
        this.id = id
    }

    getId() {
        return this.id
    }

    setFloor(floor: number) {
        this.floor = floor
    }

    getFloor() {
        return this.floor
    }

    setStatus(status: STATUS) {
        this.status = status
    }

    getStatus() {
        return this.status
    }

    setDirection(direction: DIRECTION) {
        this.direction = direction
    }

    getDirection() {
        return this.direction
    }

    setQueue(queue: iQueueElevator[]) {
        this.queue = queue
    }

    getQueue() {
        return this.queue
    }

    public getDataElevator(): iElevator {
        return {
            id: this.id,
            direction: this.direction,
            floor: this.floor,
            status: this.status,
            queue: this.queue
        }
    }

    public initial() {
        this.direction = ''
        this.status = 'IDLE'
        this.floor = 1
        this.queue = []
    }

    public addQueue(payload: iQueueElevator) {
        this.queue.push(payload)
    }

    public async oppositeDirection() {
        const objMaxFloorUp = this.getObjMaxFloorUpInQueue()
        const objMinFloorDown = this.getObjMinFloorDownInQueue()

        if(!this.queue || this.queue.length === 0) return

        if(objMaxFloorUp && this.floor < objMaxFloorUp.floor && this.direction === 'UP') return

        if(objMinFloorDown && this.floor > objMinFloorDown.floor && this.direction === 'DOWN') return

        console.log('--------------- oppositeDirection -------------------', objMaxFloorUp, '---', objMinFloorDown)
        
        switch(this.direction) {
            case 'UP':
                if(this.direction === objMaxFloorUp?.direction) this.removeQueue()

                if (objMinFloorDown) this.direction = 'DOWN'

                this.removeQueue()

                break
            case 'DOWN':
                if(this.direction === objMinFloorDown?.direction) this.removeQueue()

                if(objMaxFloorUp) this.direction = 'UP'

                this.removeQueue()

                break
        } 

        console.log('----------------------oppositeDirection 111----------------------------', objMinFloorDown, objMaxFloorUp, this.direction)
    }

    public async move() {
        if (!this.canMove()) return

        this.status = 'MOVING'

        await sleepAsync(1000)

        switch(this.direction) {
            case 'UP':
                this.floor += 1
                break
            case 'DOWN':
                this.floor -= 1
                break
        }

        console.log('-------------- Move elevator --------------', )
        console.log(this)
    }

    public async open() {
        if( !this.hasCalledElevator()) return

        this.status = 'OPENING'

        await sleepAsync(1500)
    }

    public async close() {
        if (!this.hasCalledElevator()) return

        this.status = 'CLOSING'

        await sleepAsync(1500)

        this.removeQueue()
    }

    public async idle() {
        this.status = 'IDLE'
    }

    public reset() {
        this.direction = ''
        this.status = 'IDLE'

        console.log('----------- Resettt ------------ ')
        console.log(this)
    }

    private removeQueue() {
        const idxQueue = this.queue.findIndex((q) => {
            return q.direction === this.direction && q.floor === this.floor
        })

        if (idxQueue === -1) return 

        this.queue.splice(idxQueue, 1)

        console.log('----------- Remove Queue ------------ ')
        console.log(this)
    }

    private getObjMaxFloorUpInQueue(): iQueueElevator | null{
        return this.queue
            .reduce((maxReq, req) => (req.floor > maxReq.floor ? req : maxReq), this.queue[0]);
    }

    private getObjMinFloorDownInQueue(): iQueueElevator | null{
        return this.queue
            .reduce((minReq, req) => (req.floor < minReq.floor ? req : minReq), this.queue[0]);
    }

    private hasCalledElevator(): boolean {
        const idxQueue = this.queue.findIndex((q) => {
            return q.direction === this.direction && q.floor === this.floor
        })

        if (idxQueue === -1) return false

        return true
    }

    private canMove(): boolean {
        const objMaxFloorUp = this.getObjMaxFloorUpInQueue()
        const objMinFloorDown = this.getObjMinFloorDownInQueue()

        console.log('this.direction ===== ', 1)
        switch(this.direction) {
            case 'UP':
                if (objMaxFloorUp && this.floor + 1 > objMaxFloorUp.floor) {
                    console.log('this.direction ===== ', 2, this.floor, this.floor+1 > objMaxFloorUp.floor)
                    return false
                }
                break
            case 'DOWN':
                if (objMinFloorDown && this.floor - 1 < objMinFloorDown.floor) {
                    console.log('this.direction ===== ', 3, this.floor, this.floor - 1 < objMinFloorDown.floor)
                    return false
                }
                break
        }

        return true
    }
}