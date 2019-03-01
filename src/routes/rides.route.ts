import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import { validateWith } from '../validation';
import { authValidation } from '../validation/auth';
import * as validation from '../validation/rides';

export default class UsersRoute {
	constructor(app: Express) {
    app.route("/v1/rides").post(
      validateWith(authValidation, validation.create),
      ridesController.create
    );

    app.route("/v1/rides").get(
      validateWith(authValidation, /* unique validator */),
      // controller
    )
	}
}