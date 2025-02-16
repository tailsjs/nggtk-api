export interface IMyDocument {
    name: string,
    value: string,
    title: string
}

export class MyDocument {
    constructor (
        public name: string,
        public value: string,
        public title: string
    ) {}
}