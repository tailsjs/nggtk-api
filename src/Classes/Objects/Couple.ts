export interface ICouple {
    i: string,
    name: string,
    office: string
}

export class Couple {
    constructor (
        public i: string,
        public name: string,
        public office: string
    ) { }
}