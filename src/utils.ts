import { inspect } from "util";

export class Utils {
    static inspect (string: any) {
        return inspect(string, {
            colors: true,
        })
    }
}