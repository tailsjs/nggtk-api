import { IScheduleData, ScheduleData } from "./Objects/ScheduleData.js"

export class Schedule {
    notify: boolean = false
    schedule: ScheduleData[] = []
    groups: string[] = []

    constructor (notify: boolean, schedule: IScheduleData[], groups: string[]) {
        this.notify = notify
        
        for (const sch of schedule) {
            this.schedule.push(
                new ScheduleData(
                    sch.name, 
                    sch.couples
                )
            )
        }

        this.groups = groups
    }
}