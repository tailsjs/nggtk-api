export interface IEvent {
    id: string,
    name: string,
    background: string,
    type_events: string,
    start_date: string,
    end_date: string,
    short_description: string
}

export class Event {
    constructor (
        public id: string,
        public name: string,
        public background: string,
        public type_events: string,
        public start_date: string,
        public end_date: string,
        public short_description: string
    ) {}
}