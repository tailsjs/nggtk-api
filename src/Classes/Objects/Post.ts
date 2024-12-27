export interface IPost {
    id: string,
    date_public: string,
    background: string,
    title: string
}

export class Post {
    constructor (
        public id: string, 
        public date_public: string, 
        public background: string, 
        public title: string
    ) {}
}