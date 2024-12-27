export interface INewspaperData {
    id: string,
    background: string
}

export class NewspaperData {
    constructor (
        public id: string,
        public background: string
    ) {}
}