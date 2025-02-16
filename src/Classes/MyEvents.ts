import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { IMyEvent, MyEvent } from "./Objects/MyEvent.js";

export class MyEvents {
    private events: MyEvent[] = []
    constructor (events: IMyEvent[]) {
        
        for (const event of events) {
            this.events.push(
                new MyEvent(
                    event.id,
                    event.models,
                    event.name,
                    event.short_description,
                    event.background
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.events[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.events.length;
    }

    [index: number]: MyEvent;

    toJSON(): MyEvent[] {
        return this.events;
    }

    toString(): string { // silly hack
        return `MyEvents ${Utils.inspect(this.events)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}