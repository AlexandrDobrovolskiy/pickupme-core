import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import { validateWith } from '../validation';
import { authValidation } from '../validation/auth';
import { create as createValidation } from '../validation/rides';

export default class UsersRoute {
	constructor(app: Express) {
    app.route("/v1/rides").post(
      validateWith(authValidation, createValidation),
      ridesController.create
    );

    // app.route("/v1/rides/driver").get(
    //   validateWith(authValidation, /* unique validator */),
    //   // controller
    // );

    // app.route("/v1/rides/passanger").get(
    //   validateWith(authValidation, /* unique validator */),
    //   // controller
    // );

    // app.route("/v1/rides/search").get(
    //   validateWith(authValidation, /* unique validator */),
    //   // controller
    // );
	}
}