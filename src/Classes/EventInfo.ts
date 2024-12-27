import { Participant } from "./Objects/Participant.js"
import { IParticipants, Participants } from "./Objects/Participants.js"

export class EventInfo {
    id: string = ""
    name: string = ""
    view_events: string = ""
    type_events: string = ""
    description: string = ""
    initiator: string = ""
    participants: Participants = new Participants(0, [])
    background: string = ""
    is_participant: boolean = false

    constructor (
        id: string, 
        name: string, 
        view_events: string,
        type_events: string,
        description: string,
        initiator: string,
        participants: IParticipants,
        background: string,
        is_participant: boolean
    ) {
        this.id = id
        this.name = name
        this.view_events = view_events
        this.type_events = type_events
        this.description = description
        this.initiator = initiator
        
        const participantArray = []

        for (const participant of participants.data) {
            participantArray.push(
                new Participant(
                    participant.id,
                    participant.surname,
                    participant.name,
                    participant.student_id,
                    participant.group
                )
            )
        }

        this.participants = new Participants(participants.count, participantArray)
        this.background = background
        this.is_participant = is_participant
    }

    static createEmptyClass () {
        return new EventInfo("", "", "", "", "", "", Participants.createEmptyClass(), "", false)
    }
}