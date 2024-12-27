import { ITeacher, Teacher } from "./Objects/Teacher.js";

export class Teachers {
    head: Teacher = Teacher.createNewEmptyTeacher()
    teachers: Teacher[] = []
    countStudents: number = 0

    constructor (head: ITeacher, teachers: ITeacher[], countStudents: number) {
        this.head = Teacher.createNewTeacher(head)

        for (const teacher of teachers) {
            this.teachers.push(
                Teacher.createNewTeacher(teacher)
            )
        }

        this.countStudents = countStudents
    }

    static createEmptyClass() {
        return new Teachers(
            Teacher.createNewEmptyTeacher(),
            [],
            0
        )
    }
}