import { Express } from "express";
import { ridesController } from "../controllers/rides.controller";

import * as validation from '../validation/rides';
import { withAuth } from '../validation/auth';

export default class UsersRoute {
	constructor(app: Express) {
    app.route("/v1/rides")
      .post(withAuth, validation.create, ridesController.create);
	}
}