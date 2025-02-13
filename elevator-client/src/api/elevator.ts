import { iElevator } from "@/types/elevator"

export const initialElevator = async (): Promise<iElevator[]> => {
    console.log('process.env.API_HOST= === ', process.env.API_HOST)

    const data = await fetch(`${process.env.API_HOST}/elevator/initial`)
    const result = await data.json()

    return result
}