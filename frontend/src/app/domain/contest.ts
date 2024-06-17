export interface Contest{
  name:string,
  startTime:Date,
  endTime:Date,
  max_participants:number,
  task:string,
  state:string,
}
export enum ContestStates{
  before_start="before_start",
  running="running",
  voting="voting",
  over="over"
}
