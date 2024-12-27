import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { ISliderData, SliderData } from "./Objects/SliderData.js";

export class Slider {
    private sliders: SliderData[] = []
    constructor (news: ISliderData[]) {
        for (const post of news) {
            this.sliders.push(
                new SliderData(
                    post.id,
                    post.image
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.sliders[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.sliders.length;
    }

    [index: number]: SliderData;

    toJSON(): SliderData[] {
        return this.sliders;
    }

    toString(): string { // silly hack
        return `Slider ${Utils.inspect(this.sliders)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}