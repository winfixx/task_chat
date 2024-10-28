export class ConnectionInChatDto {
  constructor(
    public userId: string,
    public chatId: string,
    public userName: string
  ) { }
}
