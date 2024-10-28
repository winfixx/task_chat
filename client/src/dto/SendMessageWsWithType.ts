export class SendMessageWsWithType<T, K = string> {
  constructor(
    public data: T,
    public type: K
  ) { }
}