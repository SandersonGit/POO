export class Videos {
    constructor(
        private id: string,
        private title: string,
        private duration: number,
        private created_at: string
    ){}
    public getId(): string{
        return this.id
    }
    public getTitle(): string{
        return this.title
    }
    public getDuration(): number{
        return this.duration
    }
    public getCreatedASt(): string{
        return this.created_at
    }


}