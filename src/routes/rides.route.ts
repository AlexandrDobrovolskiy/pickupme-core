import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import { authValidation } from '../validation/auth';
import { create, search } from '../validation/rides';
import { useValidation } from "../utils/validation/use-validation";
import { useController } from "../utils/controllers/use-controller";
import * as Routes from './routes';

export default class UsersRoute {
  constructor(app: Express) {
    app
      .route(Routes.Rides.CREATE)
      .post(
        useValidation(authValidation, create),
        useController(ridesController.create),
      );

    // app.route("/v1/rides/driver").get(
    //   validateWith(authValidation, /* unique validator */),
    //   // controller
    // );

    // app.route("/v1/rides/passanger").get(
    //   validateWith(authValidation, /* unique validator */),
    //   // controller
    // );

    app
      .route(Routes.Rides.SEARCH)
      .post(
        useValidation(authValidation, search),
        useController(ridesController.search),
      );
  }
}