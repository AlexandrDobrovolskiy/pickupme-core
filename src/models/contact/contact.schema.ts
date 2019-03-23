import { Schema } from "mongoose";

export var ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})