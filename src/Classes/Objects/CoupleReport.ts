export interface ICoupleReport {
    couple: string,
    status: string,
    delay_time: string
}

export class CoupleReport {
    constructor (
        public couple: string,
        public status: string,
        public delay_time: string
    ) {}
}