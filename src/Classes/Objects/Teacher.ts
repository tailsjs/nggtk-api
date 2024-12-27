export interface ITeacher {
    surname: string,
    name: string,
    middle_name: string,
    position: string,
    avatar: string
}

export class Teacher {
    constructor (
        public surname: string,
        public name: string,
        public middle_name: string,
        public position: string,
        public avatar: string
    ) {}

    static createNewTeacher(teacherObject: ITeacher) {
        return new Teacher(
            teacherObject.surname,
            teacherObject.name,
            teacherObject.middle_name,
            teacherObject.position,
            teacherObject.avatar
        )
    }

    static createNewEmptyTeacher() {
        return new Teacher("", "", "", "", "")
    }
}