import { AttendanceReport, IAttendanceReport } from "./Objects/AttendanceReport.js";

export class AttendanceStudentInfoDetailed {
    reports: AttendanceReport[] = []

    constructor (reports: IAttendanceReport[]) {
        for (const report of reports) {
            this.reports.push(
                new AttendanceReport(
                    report.name,
                    report.id_account,
                    report.couples_report
                )
            )
        }
    }
}