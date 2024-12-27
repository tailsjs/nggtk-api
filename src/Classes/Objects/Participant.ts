export interface IParticipant {
    id: string,
    surname: string,
    name: string,
    student_id: string,
    group: string
}

export class Participant {
    constructor (
        public id: string,
        public surname: string,
        public name: string,
        public student_id: string,
        public group: string
    ) {}
}