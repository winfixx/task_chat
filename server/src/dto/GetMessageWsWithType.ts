export class GetMessageWsWithType<K = string> {
  constructor(
    public data: unknown,
    public type: K
  ) { }
}
