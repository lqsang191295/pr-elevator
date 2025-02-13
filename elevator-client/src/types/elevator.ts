export type STATUS = 'IDLE' | 'WAIT' | 'MOVING' | 'OPENING' | 'STOP'
export type DIRECTION = 'UP' | 'DOWN'

export interface iElevator {
    id: number
    floor: number
    direction: DIRECTION | null
    status: STATUS
}

export interface iRequestFloor {
    id: number
    direction: string
    floor: number
}

export const DIRECTION = {
    UP: 'UP', DOWN: 'DOWN'
}