import { IIdentityCard, IdentityCard } from "./Objects/IdentityCard.js";

interface IExpelled {
    IdentityCard: IIdentityCard
}

export class Expelled {
    IdentityCard: IdentityCard = new IdentityCard(-1)

    constructor (result: IExpelled) {
        this.IdentityCard = new IdentityCard(result.IdentityCard.expelled)
    }
}