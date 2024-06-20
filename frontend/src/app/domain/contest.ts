export class Contest{
  name:string
  start_time:Date
  end_time:Date
  max_participants:number
  description:string
  task:string
  state:string
}
export enum ContestStates{
  before_start="before_start",
  running="running",
  voting="voting",
  over="over"
}
