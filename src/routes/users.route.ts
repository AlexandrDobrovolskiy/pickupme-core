import { Express } from "express";
import { usersController } from "../controllers/users.controller";

import * as validation from '../validation/users';
import { validateWith } from '../validation';

export default class UsersRoute {
	constructor(app: Express) {

    app.route("/v1/users").post(
			validateWith(validation.login),
			usersController.loginWithTelegram
		);

		app.route("/v1/users").get(usersController.get);
	}
}