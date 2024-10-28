export class UnConnectionInChatDto {
  constructor(
    public userId: string,
    public chatId: string,
    public userName: string
  ) { }
}
