import { Ride } from "models/rides";
import fetch from 'node-fetch';

export class TelegramNotifier {
  private static NOTIFY_URL: string = 'https://api.telegram.org/bot712762909:AAE79eaqD6woOXRiCXVH0tv6qRikOJOguXw';

  private static composeUrls(phone: string, telegramId: string, name: string, ride: Ride): string[] {
    const contact = `${this.NOTIFY_URL}/sendContact?chat_id=${telegramId}&phone_number=${phone}&first_name="Lol"`;
    const message = `${this.NOTIFY_URL}/sendMessage?chat_id=${telegramId}&text=${encodeURI(`Информация про поездку:\n Когда: ${new Date(ride.date).toDateString()},\n Сколько: ${ride.price} UAH.`)}`;

    return [contact, message];
  }

  private static notifyOne(ride: Ride, subscriber: any): Promise<Response> {
    const { phone, telegramId, name } = subscriber;

    // @TODO: notify about ride
    const [contactUrl, messageUrl] = this.composeUrls(phone, telegramId, name, ride);
    return fetch(contactUrl)
      .then(() => fetch(messageUrl));
  }

  public static async notify(ride: Ride, subscribers: Array<any>): Promise<void> {
    console.log(subscribers);
    const notifications = await Promise.all(subscribers.map(sub => this.notifyOne(ride, sub)));

    console.log(`Notified ${notifications.length} subscribers.`); 

    // @TODO: filter notification to handle errors
  }
}