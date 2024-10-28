export class Message {
  constructor(
    public id: string,
    public userId: string,
    public chatId: string,
    public senderName: string,
    public messageText: string,
    public createdAt: Date
  ) { }
}