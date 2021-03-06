import { Location } from "../location";
import { DEPARTURE_RADIUS, ARRIVAL_RADIUS } from '../location';

export class RidesQueries {
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

    if (dateNumber < new Date().getTime()) {
      from = new Date();
    }

    return {
      $or: [
        { date: { $gte: from } },
        { date: { $lte: to } },
      ],
      seats: { $gte: seats },
      departure: {
        $geoWithin: { $center: [departure.coordinates, DEPARTURE_RADIUS], }
      },
      arrival: {
        $geoWithin: { $center: [arrival.coordinates, ARRIVAL_RADIUS], }
      },
    }
  }
}
