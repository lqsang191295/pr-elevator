export type STATUS = 'IDLE' | 'WAIT' | 'MOVING' | 'OPENING' | 'STOP' | 'CLOSING' | ''
export type DIRECTION = 'UP' | 'DOWN' | ''

export interface iElevator {
    id: number
    floor: number
    direction: DIRECTION | null
    status: STATUS
    queue?: iQueueElevator[]
}

export interface iQueueElevator {
    direction: DIRECTION
    floor: number
}

export interface iQueueElevatorPayload extends iQueueElevator {
    id: number
}