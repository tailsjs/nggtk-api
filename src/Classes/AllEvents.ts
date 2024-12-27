import { Event, IEvent } from "./Objects/Event.js"

export class AllEvents {
    events: Event[] = []
    contest: any[] = [] // because i don't know

    constructor (events: IEvent[], contest: any[]) {
        for (const event of events) {
            this.events.push(
                new Event(
                    event.id,
                    event.name,
                    event.background,
                    event.type_events,
                    event.start_date,
                    event.end_date,
                    event.short_description
                )
            )
        }

        this.contest = contest
    }
}