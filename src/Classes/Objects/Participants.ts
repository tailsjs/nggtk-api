import { IParticipant, Participant } from "./Participant.js"

export interface IParticipants {
    count: number,
    data: IParticipant[]
}

export class Participants {
    count: number = 0
    data: Participant[] = []

    constructor (count: number, data: IParticipant[]) {
        this.count = count

        for (const participant of data) {
            this.data.push(
                new Participant(
                    participant.id,
                    participant.surname,
                    participant.name,
                    participant.student_id,
                    participant.group
                )
            )
        }
    }

    static createEmptyClass() {
        return new Participants(0, [])
    }
}