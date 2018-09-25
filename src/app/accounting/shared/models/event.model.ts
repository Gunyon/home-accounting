export class HaEvent {
  constructor(
    public category: number,
    public type: string,
    public amount: number,
    public description: string,
    public date: string,
    public id?: string,
    public catName?: string
  ) {}
}
