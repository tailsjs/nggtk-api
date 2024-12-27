import { inspect } from "node:util";
import { IPost, Post } from "./Objects/Post.js";
import { Utils } from "../utils.js";

export class News {
    private news: Post[] = []
    constructor (news: IPost[]) {
        for (const post of news) {
            this.news.push(
                new Post(
                    post.id,
                    post.date_public,
                    post.background,
                    post.title
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.news[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.news.length;
    }

    [index: number]: Post;

    toJSON(): Post[] {
        return this.news;
    }

    toString(): string { // silly hack
        return `News ${Utils.inspect(this.news)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}