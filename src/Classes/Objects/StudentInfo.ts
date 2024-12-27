export interface IStudentInfo {
    id: string,
    group: string,
    academ: string,
    name: string,
    surname: string,
    father_name: string,
    date_birth: string
}

export class StudentInfo {
    constructor (
        public id: string,
        public group: string,
        public academ: string,
        public name: string,
        public surname: string,
        public father_name: string,
        public date_birth: string
    ) {}
}