export interface ITopBRSStudent {
    id: string,
    name: string,
    surname: string,
    group: string,
    points: string
}

export class TopBRSStudent {
    constructor (
        public id: string, 
        public name: string, 
        public surname: string, 
        public group: string,
        public points: string
    ) {}
}