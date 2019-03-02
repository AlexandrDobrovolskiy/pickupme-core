import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import { validateWith } from '../validation';
import { authValidation } from '../validation/auth';
import { create, search } from '../validation/rides';

export default class UsersRoute {
	constructor(app: Express) {
    app.route("/v1/rides").post(
      validateWith(authValidation, create),
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

    app.route("/v1/rides/search").post(
      validateWith(authValidation, search),
      ridesController.search
    );
	}
}