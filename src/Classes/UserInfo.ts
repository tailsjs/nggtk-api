import { GroupData, IGroupData } from "./Objects/GroupData.js"
import { IStudentInfo, StudentInfo } from "./Objects/StudentInfo.js"
import { IUserOptions, UserOptions } from "./Objects/UserOptions.js"

type TUserType = "admin" | "employee" | "teacher" | "parent" | "student"

interface INotification {
    View: boolean
}

interface IAdminOffice {
    Group: string[]
}

interface IEvent {
    Participate: boolean
}

interface IProfile {
    Notification: INotification,
    AdminOffice: IAdminOffice,
    ViewMyAttendance: boolean,
    ShowMyPoints: boolean,
    OrderingDocuments: boolean,
    MyPortfolio: boolean
}

interface IEvents {
    Event: IEvent,
    Contest: IEvent
}

interface IAvailableModules {
    Profile: IProfile,
    Events: IEvents
}

interface IUserInfo {
    id: string,
    type: TUserType,
    level: number,
    options: IUserOptions,
    description: string,
    group: IGroupData,
    academ: string,
    student_id: string,
    funding: string,
    PIN: boolean,
    GTF: string,
    AMP: string,
    PhoneСonfirmed: number,
    points: string,
    name: string,
    available_modules: IAvailableModules
    surname: string,
    middle_name: string,
    speciality: string,
    studentsGroup: IStudentInfo[],
    date_birth: string
}

export class UserInfo {
    id: string = ""
    type: TUserType = "student"
    level: number = 0
    options: UserOptions = new UserOptions(0)
    description: string = ""
    group: GroupData = new GroupData("", "")
    academ: string = ""
    student_id: string = ""
    funding: string = ""
    PIN: boolean = false
    GTF: string = ""
    AMP: string = ""
    PhoneConfirmed: number = 0
    points: string = ""
    name: string = ""
    available_modules: IAvailableModules = {
        Profile: {
            Notification: {
                View: false
            },
            AdminOffice: {
                Group: []
            },
            ViewMyAttendance: false,
            ShowMyPoints: false,
            OrderingDocuments: false,
            MyPortfolio: false
        },
        Events: {
            Event: {
                Participate: false
            },
            Contest: {
                Participate: false
            }
        }
    }

    surname: string = ""
    middle_name: string = ""
    speciality: string = ""

    studentsGroup: StudentInfo[] = []
    date_birth: string = ""

    constructor (result: IUserInfo) {
        for (const key in result) {
            if (key === "PhoneСonfirmed") {
                this.PhoneConfirmed = result["PhoneСonfirmed"]
                continue;
            }

            if (key === "studentsGroup") {
                for (const student of result.studentsGroup) {
                    this.studentsGroup.push(
                        new StudentInfo(
                            student.id,
                            student.group,
                            student.academ,
                            student.name,
                            student.surname,
                            student.father_name,
                            student.date_birth
                        )
                    )
                }
                continue;
            }

            (this as any)[key] = (result as any)[key]
        }
    }
}