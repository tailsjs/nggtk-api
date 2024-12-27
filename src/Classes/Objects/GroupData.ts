export interface IGroupData {
    group_ids: string,
    group_name: string
}

export class GroupData {
    constructor (
        public group_ids: string,
        public group_name: string
    ) {}
}