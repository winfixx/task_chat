export class GetNewMessageInChatDto {
  constructor(
    public userId: string,
    public chatId: string,
    public senderName: string,
    public message: string
  ) { }
}
