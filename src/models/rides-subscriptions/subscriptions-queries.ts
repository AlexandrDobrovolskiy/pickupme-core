import { DEPARTURE_RADIUS, ARRIVAL_RADIUS, Location } from '../location';

export class SubscriptionQueries {
  public static find(
    date: Date,
    seats: number,
    interval: number,
    departure: Location,
    arrival: Location,
  ): any {
    var dateNumber = new Date(date).getTime();
    var from = new Date(dateNumber - interval);
    var to = new Date(dateNumber + interval);

    return {
      date: {
        $gte: from,
        $lte: to,
      },
      seats: { $lte: seats },
      departure: {
        $geoWithin: { $center: [[...departure.coordinates], DEPARTURE_RADIUS], }
      },
      arrival: {
        $geoWithin: { $center: [[...arrival.coordinates], ARRIVAL_RADIUS], }
      },
    }
  }
}
