import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { INewspaperData, NewspaperData } from "./Objects/NewspaperData.js";

export class Newspaper {
    private newspapers: NewspaperData[] = []
    constructor (newspapers: INewspaperData[]) {
        for (const newspaper of newspapers) {
            this.newspapers.push(
                new NewspaperData(
                    newspaper.id,
                    newspaper.background
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.newspapers[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.newspapers.length;
    }

    [index: number]: NewspaperData;

    toJSON(): NewspaperData[] {
        return this.newspapers;
    }

    toString(): string { // silly hack
        return `Newspaper ${Utils.inspect(this.newspapers)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}