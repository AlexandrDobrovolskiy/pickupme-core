import { Schema } from "mongoose";
import { Location } from "./location";

export var LocationSchema: Schema = new Schema({
  longitude: {
    type: Schema.Types.Number,
    required: true,
  },
  lantitude: {
    type: Schema.Types.Number,
    required: true
  },
})