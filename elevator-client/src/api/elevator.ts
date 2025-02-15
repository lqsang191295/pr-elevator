import { iElevator, iRequestFloor } from "@/types/elevator"

const API_HOST = process.env.API_HOST || 'https://pr-elevator.vercel.app'

export const initialElevator = async (): Promise<iElevator[]> => {
    console.log('process.env.API_HOST= === ', process.env.API_HOST)

    const data = await fetch(`${API_HOST}/elevator/initial`)
    const result = await data.json()

    return result
}

export const callElevator = async (payload: iRequestFloor) => {
    await fetch(`${API_HOST}/elevator/callElevator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Thêm header để chỉ định JSON
          },
        body: JSON.stringify(payload),
      })
}