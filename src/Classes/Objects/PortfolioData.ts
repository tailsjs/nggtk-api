export interface IPortfolioData {
    id: string,
    full_image: string
}

export class PortfolioData {
    constructor (
        public id: string,
        public full_image: string
    ) {}
}