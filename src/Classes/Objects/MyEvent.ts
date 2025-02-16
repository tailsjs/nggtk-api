export interface IMyEvent {
    id: string,
    models: string,
    name: string,
    short_description: string,
    background: string
}

export class MyEvent {
    constructor (
        public id: string,
        public models: string,
        public name: string,
        public short_description: string,
        public background: string
    ) {}

    isContest() {
        return this.models === "0"
    }
}