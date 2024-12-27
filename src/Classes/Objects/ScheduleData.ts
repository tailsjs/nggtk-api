import { Couple, ICouple } from "./Couple.js"

export interface IScheduleData {
    name: string,
    couples: ICouple[]
}

export class ScheduleData {
    name: string = ""
    couples: Couple[] = []

    constructor (name: string, couples: ICouple[]) {
        this.name = name
        
        for (const couple of couples) {
            this.couples.push(
                new Couple(
                    couple.i,
                    couple.name,
                    couple.office
                )
            )
        }
    }
}