import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { IPortfolioData, PortfolioData } from "./Objects/PortfolioData.js";

export class Portfolio {
    private portfolio: PortfolioData[] = []
    constructor (portfolio: IPortfolioData[]) {
        for (const post of portfolio) {
            this.portfolio.push(
                new PortfolioData(
                    post.id,
                    post.full_image
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.portfolio[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.portfolio.length;
    }

    [index: number]: PortfolioData;

    toJSON(): PortfolioData[] {
        return this.portfolio;
    }

    toString(): string { // silly hack
        return `Portfolio ${Utils.inspect(this.portfolio)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }

    static createEmptyClass() {
        return new Portfolio([])
    }
}