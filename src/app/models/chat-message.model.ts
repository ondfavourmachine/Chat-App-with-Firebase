export class ChatMessage{
    $key?: string;
    email?: string;
    userName?: string;
    message?: string | Array<string>;
    timeSent?: string | Date;
}