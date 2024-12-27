import { CoupleReport, ICoupleReport } from "./CoupleReport.js";

export interface IAttendanceReport {
    name: string,
    id_account: string,
    couples_report: ICoupleReport[]
}

export class AttendanceReport {
    name: string = ""
    id_account: string = ""
    couples_report: CoupleReport[] = []

    constructor (name: string, id_account: string, couples_report: ICoupleReport[]) {
        this.name = name
        this.id_account = id_account

        for (const report of couples_report) {
            this.couples_report.push(
                new CoupleReport(
                    report.couple,
                    report.status,
                    report.delay_time
                )
            )
        }
    }
}