import { inspect } from "node:util";
import { Utils } from "../utils.js";
import { ITopBRSStudent, TopBRSStudent } from "./Objects/TopBRSStudent.js";

export class TopBRSStudents {
    private students: TopBRSStudent[] = []
    constructor (students: ITopBRSStudent[]) {
        for (const student of students) {
            this.students.push(
                new TopBRSStudent(
                    student.id,
                    student.name,
                    student.surname,
                    student.group,
                    student.points
                )
            )
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.students[Number(prop)];
                }
                
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this.students.length;
    }

    [index: number]: TopBRSStudent;

    toJSON(): TopBRSStudent[] {
        return this.students;
    }

    toString(): string { // silly hack
        return `TopBRSStudents ${Utils.inspect(this.students)}`
    }

    [inspect.custom](): string {
        return this.toString();
    }
}