import { Ride } from "models/rides";
import fetch from 'node-fetch';

export class TelegramNotifier {
  private static NOTIFY_URL: string = 'https://api.telegram.org/bot712762909:AAE79eaqD6woOXRiCXVH0tv6qRikOJOguXw';

  private static composeUrls(telegramId: string, ride: Ride): string[] {
    const { driverContact } = ride;
    const contact = `${this.NOTIFY_URL}/sendContact?chat_id=${telegramId}&phone_number=${driverContact.phone}&first_name=${encodeURI(driverContact.name)}`;
    const message = `${this.NOTIFY_URL}/sendMessage?chat_id=${telegramId}&text=${encodeURI(`🚘 Поездка найдена 🚘 \n\n⏱ Когда: ${new Date(ride.date).toLocaleDateString('uk-UA')} в ${new Date(ride.date).toLocaleTimeString('uk-UA').split(':').slice(0, 2)},\n💵 Стоимость поездки: ${ride.price} UAH.\n💺 Мест в машине: ${ride.seats}.`)}`;

    return [contact, message];
  }

  private static notifyOne(ride: Ride, subscriber: any): Promise<Response> {
    const { telegramId } = subscriber;

    const [contactUrl, messageUrl] = this.composeUrls(telegramId, ride);
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