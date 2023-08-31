export = Nggtk;
declare class Nggtk {
    /**
     * Враппер НГТК API.
     * Неофициальный враппер API НГТК от одного студента для других студентов.
     * @param { String } uriQuery То, что идёт после https://nggtk.ru/api/v2/METHOD_NAME/
     */
    constructor(uriQuery: string);
    uriQuery: string;
    /**
     * Сделать запрос на API НГТК.
     * @param { Object } data Данные, нужные для запроса.
     * @param { String } data.method Название API-метода.
     * @param { FormData } data.body FormData запроса.
     * @param { String } data.requestMethod Методы (GET, POST, т.д)
     * @returns { JSON | String } Результат запроса.
     */
    method(data?: {
        method: string;
        body: FormData;
        requestMethod: string;
    }): JSON | string;
    /**
     * Проверка на то, что студент является пользователем ВКонтакте.
     *
     * @returns { JSON } result Результат запроса
     */
    checkUserVK(): JSON;
    /**
     * Получение информации о студенте.
     *
     * @returns { JSON } result Результат запроса
     */
    getUserInfo(): JSON;
    /**
     * Получение топа студентов по баллам.
     *
     * @returns { Array } result Результат запроса
     */
    getTopBRSStudents(): any[];
    /**
     * Получение новостей.
     *
     * @returns { Array } result Результат запроса
     */
    getNews(): any[];
    /**
     * Получение всех новостей.
     *
     * @returns { Array } result Результат запроса
     */
    getAllNews(): any[];
    /**
     * Получение слайдов с главной страницы.
     *
     * Если вы хотите получить доступ к самим картинкам - https://nggtk.ru/SLIDER_URL
     *
     * @returns { Array } result Результат запроса
     */
    getSlider(): any[];
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
    getMyNotifications(type: string): JSON | number;
    /**
     * Получение газеты с главной страницы.
     *
     * Если вы хотите получить доступ к самим картинкам - https://nggtk.ru/BG_URL
     *
     * @returns { Array } result Результат запроса
     */
    getNewspaper(): any[];
    /**
     * Получение всех мероприятий.
     *
     * @returns { JSON } result Результат запроса
     */
    getAllEvents(): JSON;
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
    getSchedule(group: string): JSON;
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
    getTeachers(groupId: number): JSON;
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
    changeNotifyScheduleState(value: boolean): any[];
    /**
     * Получение сводки баллов студента.
     *
     * @returns { Array } result Результат запроса
     */
    getInfoPoints(): any[];
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
    getEventInfo(id: number): JSON;
    /**
     * Получение портфолио студента.
     *
     * @returns { Object } result Результат запроса
     */
    getPortfolio(): any;
    /**
     * Получение мероприятий, в которых участвовал студент.
     *
     * @returns { Object } result Результат запроса
     */
    getEvents(): any;
    /**
     * Получение информации о том, отчислен ли студент.
     *
     * @returns { Object } result Результат запроса
     */
    getExpelled(): any;
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
    getAttendaceStudentInfo(action: string, period: string): any[];
}
import FormData = require("form-data");
