import { createHash } from "node:crypto";
import { CheckUserVK } from "./Classes/CheckUserVK.js";
import { EventInfo } from "./Classes/EventInfo.js";
import { AllEvents } from "./Classes/AllEvents.js";
import { InfoPoints } from "./Classes/InfoPoints.js";
import { News } from "./Classes/News.js";
import { Newspaper } from "./Classes/Newspaper.js";
import { Portfolio } from "./Classes/Portfolio.js";
import { Schedule } from "./Classes/Schedule.js";
import { Slider } from "./Classes/Slider.js";
import { Teachers } from "./Classes/Teachers.js";
import { TopBRSStudents } from "./Classes/TopBRSStudents.js";
import { Expelled } from "./Classes/Expelled.js";
import { AttendanceStudentInfoSemester } from "./Classes/AttendanceStudentInfoSemester.js";
import { AttendanceStudentInfoPeriod } from "./Classes/AttendanceStudentInfoPeriod.js";
import { AttendanceStudentInfoDetailed } from "./Classes/AttendanceStudentInfoDetailed.js";
import { UserInfo } from "./Classes/UserInfo.js";
import { MyEvents } from "./Classes/MyEvents.js";
import { MyDocuments } from "./Classes/MyDocuments.js";

type TDDMMYYYY =
  | `${number}.${number}.${number}${number}${number}${number}`
  | `${number}${number}.${number}.${number}${number}${number}${number}`
  | `${number}.${number}${number}.${number}${number}${number}${number}`
  | `${number}${number}.${number}${number}.${number}${number}${number}${number}`;

type TRequestMethod = "GET" | "POST"
type TNotificationType = "count"
type TAttendanceInfo = "DetailedAttendance" | "TrafficPeriod"
type TAttendancePeriod = "ThisWeek" | "ThisMonth" | "FirstSemester" | "SecondSemester" | TDDMMYYYY

interface IRequest {
    method: string,
    body?: FormData,
    requestMethod?: TRequestMethod
}

export class Nggtk {
    private BASE_ROUTE: string = "https://nggtk.ru/api/v2/"
    private urlQuery: string = ""

    constructor (urlQuery: string) {
        this.urlQuery = urlQuery
    }

    private async method (data: IRequest): Promise<any> {
        if (!data.requestMethod) {
            data.requestMethod = "GET"
        }

        const response = await fetch(this.BASE_ROUTE + data.method + "?" + this.urlQuery, {
            body: data.body,
            method: data.requestMethod
        })

        let result = await response.text()

        if (result.includes("signature")) {
            throw new Error("Incorrect urlQuery!")
        }

        try {
            result = JSON.parse(result)
        } catch (e) {}

        return result
    }

    public async checkUserVK() {
        const result = await this.method({
            method: "CheckUserVK"
        })

        const checkUserVk = new CheckUserVK(result.user_vk)

        return checkUserVk
    }

    public async getUserInfo() {
        const result = await this.method({
            method: "GetInfoUser"
        })

        const userInfo = new UserInfo(result)

        return userInfo
    }

    public async getTopBRSStudents() {
        const result = await this.method({
            method: "GetTopBRSStudents"
        })

        const students = new TopBRSStudents(result)

        return students
    }

    public async getNews() {
        const result = await this.method({
            method: "GetNews"
        })

        const news = new News(result)

        return news
    }

    public async getAllNews() {
        const result = await this.method({
            method: "GetNewsAll"
        })

        const news = new News(result)

        return news
    }

    public async getSlider() {
        const result = await this.method({
            method: "GetSlider"
        })

        const slider = new Slider(result)

        return slider
    }

    public async getMyNotifications(type: TNotificationType): Promise<number> {
        const formdata = new FormData()

        formdata.append("type", type)

        const result = await this.method({
            method: "GetMyNotifications",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    public async getNewspaper() {
        const result = await this.method({
            method: "GetNewspaper"
        })

        const newspaper = new Newspaper(result)

        return newspaper
    }

    public async getAllEvents() {
        const result = await this.method({
            method: "GetEventsAll"
        })

        const events = new AllEvents(result.events, result.contest)

        return events
    }

    public async getSchedule(group: string) {
        const formdata = new FormData()

        formdata.append("group", group)

        const result = await this.method({
            method: "GetScheduleGroup",
            body: formdata,
            requestMethod: "POST"
        })

        const schedule = new Schedule(result.notify, result.schedule, result.groups)

        return schedule
    }

    public async getTeachers(groupId: number) { // I don't get it. 100 - 38K
        const formdata = new FormData()

        formdata.append("idGroup", groupId.toString())

        const result = await this.method({
            method: "GetTeachers",
            body: formdata,
            requestMethod: "POST"
        })

        if (result === "") {
            return Teachers.createEmptyClass()
        }

        const teachers = new Teachers(result.head, result.teachers, result.countStudents)

        return teachers
    }

    public async changeNotifyScheduleState(value: boolean): Promise<boolean> {
        const formdata = new FormData()

        formdata.append("method", "ChangeStateNotifySchedule")
        formdata.append("val", value.toString())

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    public async getInfoPoints() {
        const formdata = new FormData()

        formdata.append("method", "GetInfoPoints")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        const infoPoints = new InfoPoints(result)

        return infoPoints
    }

    public async getEventInfo(id: number) {
        if (isNaN(id)) {
            throw new Error("Вы указали некорректный ID мероприятия!")
        }

        const formdata = new FormData()

        formdata.append("id", id.toString())

        const result = await this.method({
            method: "events/GetInfoEvent",
            body: formdata,
            requestMethod: "POST"
        })
        
        if (result === "") {
            return EventInfo.createEmptyClass()
        }

        const eventInfo = new EventInfo(
            result.id,
            result.name,
            result.view_events,
            result.type_events,
            result.description,
            result.initiator,
            result.participants,
            result.background,
            result.is_participant
        )

        return eventInfo
    }

    public async getPortfolio() {
        const formdata = new FormData()

        formdata.append("method", "GetPortfolio")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        if (result === "") {
            return Portfolio.createEmptyClass()
        }

        const portfolio = new Portfolio(result)

        return portfolio
    }

    public async getEvents() {
        const formdata = new FormData()

        formdata.append("method", "GetEvents")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        const myevents = new MyEvents(result)

        return myevents // later
    }

    public async getExpelled() {
        const formdata = new FormData()

        formdata.append("method", "IdentityInformation")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        const expelled = new Expelled(result)

        return expelled
    }

    public async getAttendaceStudentInfo(action: TAttendanceInfo, period: TAttendancePeriod): Promise<AttendanceStudentInfoSemester | AttendanceStudentInfoPeriod | AttendanceStudentInfoDetailed> {
        const formdata = new FormData()

        formdata.append("Action", action)
        formdata.append("Period", period)

        const result = await this.method({
            method: "GetInfoAttendanceStudent",
            body: formdata,
            requestMethod: "POST"
        })

        if (action === "TrafficPeriod") {
            switch (period) {
                case "FirstSemester":
                case "SecondSemester":
                    return new AttendanceStudentInfoSemester(result.UserAttendance)
                case "ThisWeek":
                case "ThisMonth":
                    return new AttendanceStudentInfoPeriod(result)
                break;
            }
        }

        return new AttendanceStudentInfoDetailed(result.report)
    }

    public async participate(idEvent: number) {
        if (!idEvent) {
            throw new Error("Вы не указали ID события!")
        }

        const formData = new FormData()

        formData.set("idEvent", idEvent.toString())

        const result = await this.method({
            method: "events/Participate",
            body: formData,
            requestMethod: "POST"
        })

        return result
    }

    public async getMyDocuments(pin: string) {
        if (!pin) {
            throw new Error("Вы не указали свой PIN-код.") 
        }

        const formData = new FormData()

        formData.set("method", "MyDocuments")
        formData.set("pin", createHash("md5").update(pin).digest('hex'))

        const result = await this.method({
            method: "student",
            body: formData,
            requestMethod: "POST"
        })

        if (result.errors.length !== 0) {
            throw new Error(result.errors[0])
        }

        const mydocuments = new MyDocuments(result.RT)

        return mydocuments
    }
}