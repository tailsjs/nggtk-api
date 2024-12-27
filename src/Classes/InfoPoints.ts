import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { IInfoPoint, InfoPoint } from "./Objects/InfoPoint.js";

export class InfoPoints {
    private infoPoints: InfoPoint[] = []
    constructor (infoPoints: IInfoPoint[]) {
        for (const info of infoPoints) {
            this.infoPoints.push(
                new InfoPoint(
                    info.id,
                    info.type_operation,
                    info.transaction_description,
                    info.amount,
                    info.date_time
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.infoPoints[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.infoPoints.length;
    }

    [index: number]: InfoPoint;

    toJSON(): InfoPoint[] {
        return this.infoPoints;
    }

    toString(): string { // silly hack
        return `InfoPoints ${Utils.inspect(this.infoPoints)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}