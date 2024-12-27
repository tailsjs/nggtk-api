export interface IInfoPoint {
    id: string,
    type_operation: string,
    transaction_description: string,
    amount: string,
    date_time: string
}

export class InfoPoint {
    constructor (
        public id: string,
        public type_operation: string,
        public transaction_description: string,
        public amount: string,
        public date_time: string
    ) {}
}