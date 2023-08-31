const fetch = require("node-fetch")
const FormData = require("form-data")
const BASE_ROUTE = "https://nggtk.ru/api/v2/"

class Nggtk {
    /**
     * Враппер НГТК API.
     * Неофициальный враппер API НГТК от одного студента для других студентов.
     * @param { String } uriQuery То, что идёт после https://nggtk.ru/api/v2/METHOD_NAME/
     */
    constructor(uriQuery) {
        this.uriQuery = uriQuery
    }

    /**
     * Сделать запрос на API НГТК.
     * @param { Object } data Данные, нужные для запроса.
     * @param { String } data.method Название API-метода.
     * @param { FormData } data.body FormData запроса.
     * @param { String } data.requestMethod Методы (GET, POST, т.д)
     * @returns { JSON | String } Результат запроса.
     */
    async method(data = {
        method: "",
        body: undefined,
        requestMethod: "GET"
    }) {
        const result = await fetch(BASE_ROUTE + data.method + "?" + this.uriQuery, {
            body: data.body,
            method: data.requestMethod
        })

        let typeOfResult = await result.text()

        try {
            typeOfResult = JSON.parse(typeOfResult)
        } catch (e) {}

        return typeOfResult
    }

    /**
     * Проверка на то, что студент является пользователем ВКонтакте.
     * 
     * @returns { JSON } result Результат запроса 
     */
    async checkUserVK() {
        const result = await this.method({
            method: "CheckUserVK"
        })

        return result
    }

    /**
     * Получение информации о студенте.
     * 
     * @returns { JSON } result Результат запроса 
     */
    async getUserInfo() {
        const result = await this.method({
            method: "GetInfoUser"
        })

        return result
    }

    /**
     * Получение топа студентов по баллам.
     * 
     * @returns { Array } result Результат запроса 
     */
    async getTopBRSStudents() {
        const result = await this.method({
            method: "GetTopBRSStudents"
        })

        return result
    }

    /**
     * Получение новостей.
     * 
     * @returns { Array } result Результат запроса 
     */
    async getNews() {
        const result = await this.method({
            method: "GetNews"
        })

        return result
    }

    /**
     * Получение всех новостей.
     * 
     * @returns { Array } result Результат запроса 
     */
    async getAllNews() {
        const result = await this.method({
            method: "GetNewsAll"
        })

        return result
    }

    /**
     * Получение слайдов с главной страницы.
     * 
     * Если вы хотите получить доступ к самим картинкам - https://nggtk.ru/SLIDER_URL
     * 
     * @returns { Array } result Результат запроса 
     */
    async getSlider() {
        const result = await this.method({
            method: "GetSlider"
        })

        return result
    }

    /**
     * Получение количества/? уведомлений.
     * 
     * @param { String } type Тип уведомлений (count|?)
     * @returns { JSON | Number }
     * 
     * @example
     * ```js
     * await nggtk.getMyNotifications("count")
     * ```
     */
    async getMyNotifications(type) {
        if (!type) {
            throw new Error("Вы не указали тип уведомлений!")
        }
        const formdata = new FormData()

        formdata.append("type", type)

        const result = await this.method({
            method: "GetMyNotifications",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение газеты с главной страницы.
     * 
     * Если вы хотите получить доступ к самим картинкам - https://nggtk.ru/BG_URL
     * 
     * @returns { Array } result Результат запроса 
     */
    async getNewspaper() {
        const result = await this.method({
            method: "GetNewspaper"
        })

        return result
    }

    /**
     * Получение всех мероприятий.
     * 
     * @returns { JSON } result Результат запроса 
     */
    async getAllEvents() {
        const result = await this.method({
            method: "GetEventsAll"
        })

        return result
    }

    /**
     * Получить расписание определённой группы.
     * 
     * @param { String } group Группа, из которой нужно получить расписание. 
     * @returns { JSON } result Расписание
     * 
     * @example
     * ```js
     * await nggtk.getSchedule("10ПК1")
     * ```
     */
    async getSchedule(group) {
        if (!group) {
            throw new Error("Вы не указали группу!")
        }

        const formdata = new FormData()

        formdata.append("group", group)

        const result = await this.method({
            method: "GetScheduleGroup",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получить преподавателей определённой группы.
     * 
     * @param { Number } groupId ID группы. 
     * @returns { JSON } result Расписание
     * 
     * @example
     * ```js
     * await nggtk.getTeachers(900000)
     * ```
     */
    async getTeachers(groupId) {
        if (!groupId || isNaN(groupId)) {
            throw new Error("Вы указали некорректный ID группы!")
        }

        const formdata = new FormData()

        formdata.append("idGroup", groupId)

        const result = await this.method({
            method: "GetTeachers",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получать ли уведомления о изменении расписания?
     * 
     * @param { Boolean } value Получать уведомления?
     * @returns { Array } result Результат запроса 
     * 
     * @example
     * ```js
     * await nggtk.changeNotifyScheduleState(true)
     * ```
     */
    async changeNotifyScheduleState(value) {
        if (typeof value != "boolean") {
            throw new Error("Значение может быть только true или false!")
        }

        const formdata = new FormData()

        formdata.append("method", "ChangeStateNotifySchedule")
        formdata.append("val", value)

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение сводки баллов студента.
     * 
     * @returns { Array } result Результат запроса 
     */
    async getInfoPoints() {
        const formdata = new FormData()

        formdata.append("method", "GetInfoPoints")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение информации о мероприятии.
     * 
     * @param { Number } id ID мероприятия
     * @returns { JSON } result Результат запроса 
     * 
     * @example
     * ```js
     * await nggtk.getEventInfo(5)
     * ```
     */
    async getEventInfo(id) {
        if (!id || isNaN(id)) {
            throw new Error("Вы указали некорректный ID мероприятия!")
        }

        const formdata = new FormData()

        formdata.append("id", id)

        const result = await this.method({
            method: "GetInfoEvent",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение портфолио студента.
     * 
     * @returns { Object } result Результат запроса 
     */
    async getPortfolio() {
        const formdata = new FormData()

        formdata.append("method", "GetPortfolio")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение мероприятий, в которых участвовал студент.
     * 
     * @returns { Object } result Результат запроса 
     */
    async getEvents() {
        const formdata = new FormData()

        formdata.append("method", "GetEvents")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение информации о том, отчислен ли студент.
     * 
     * @returns { Object } result Результат запроса 
     */
    async getExpelled() {
        const formdata = new FormData()

        formdata.append("method", "IdentityInformation")

        const result = await this.method({
            method: "student",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }

    /**
     * Получение сводки о посещаемости студента.
     * 
     * Возможные action: 
     * 
     * * DetailedAttendance - Детальная посещаемость.
     * 
     * > Необходимо в period указывать дату, за которую надо получить сводку (ДД.ММ.ГГГГ)
     * 
     * * TrafficPeriod - Посещаемость за период.
     * 
     * > Необходимо в period указывать `ThisWeek` (за эту неделю), `ThisMonth` (за этот месяц), `FirstSemester` (первый семестр), `SecondSemester` (второй семестр)
     * 
     * @param { String } action Тип сводки.
     * @param { String } period Период посещаемости.
     * @returns { Array } Результат запроса.
     * 
     * @example
     * ```js
     * await nggtk.getAttendaceStudentInfo("TrafficPeriod", "ThisWeek")
     * ```
     */

    async getAttendaceStudentInfo(action, period) {
        const formdata = new FormData()

        formdata.append("Action", action)
        formdata.append("Period", period)

        const result = await this.method({
            method: "GetInfoAttendanceStudent",
            body: formdata,
            requestMethod: "POST"
        })

        return result
    }
}

module.exports = Nggtk