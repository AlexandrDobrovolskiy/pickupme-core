import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import { authValidation } from '../validation/auth';
import { create, search } from '../validation/rides';
import { useValidation } from "../utils/validation/use-validation";
import { useController } from "../utils/controllers/use-controller";

export default class UsersRoute {
	constructor(app: Express) {
    app.route("/v1/rides").post(
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

    app.route("/v1/rides/search").post(
      useValidation(authValidation, search),
      useController(ridesController.search),
    );
	}
}