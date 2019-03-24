import { Ride } from "models/rides";

export class TelegramNotifier {
  private static NOTIFY_URL: string = 'https://api.telegram.org/bot712762909:AAE79eaqD6woOXRiCXVH0tv6qRikOJOguXw/sendContact';

  private static composeURL(phone: string, telegramId: string): string {
    return `${this.NOTIFY_URL}?
      chat_id=${telegramId}&
      phone_number=${phone}&
      first_name="Lol"`;
  }

  private static notifyOne(ride: Ride, subscriber: any): Promise<Response> {
    const { phone, telegramId } = subscriber;

    return fetch(this.composeURL(phone, telegramId));
  }

  public static async notify(ride: Ride, subscribers: Array<any>): Promise<void> {
    const notifications = await Promise.all(subscribers.map(sub => this.notifyOne(ride, sub)));

    // @TODO: filter notification to handle errors
  }
}