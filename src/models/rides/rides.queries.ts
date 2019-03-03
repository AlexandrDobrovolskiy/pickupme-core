import { Location } from "models/location";
import { DEPARTURE_RADIUS, ARIVAL_RADIUS } from '../location';

export class RidesQueries {
  public static find(
    date: Date,
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
      departure: {
        $geoWithin: { $center: [departure.coordinates, DEPARTURE_RADIUS], }
      },
      arrival: {
        $geoWithin: { $center: [arrival.coordinates, ARIVAL_RADIUS], }
      },
    }
  }
}
