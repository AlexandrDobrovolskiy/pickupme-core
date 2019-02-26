import ILocation from "services/location/ILocation";

export default interface IRidePoint {
  time: Date;
  location: ILocation;
}