export class GetMessageWsWithType<T = string> {
  constructor(
    public data: unknown,
    public type: T
  ) { }
}