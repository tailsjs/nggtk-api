import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { IMyDocument, MyDocument } from "./Objects/MyDocument.js";

export class MyDocuments {
    private documents: MyDocument[] = []
    constructor (documents: IMyDocument[]) {
        
        for (const document of documents) {
            this.documents.push(
                new MyDocument(
                    document.name,
                    document.value,
                    document.title
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.documents[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.documents.length;
    }

    [index: number]: MyDocument;

    toJSON(): MyDocument[] {
        return this.documents;
    }

    toString(): string { // silly hack
        return `MyDocuments ${Utils.inspect(this.documents)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}