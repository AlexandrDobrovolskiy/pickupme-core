import { Express } from "express";
import { usersController } from "../controllers/users.controller";

import * as validation from '../validation/users';
import { validateWith } from '../validation';

export default class UsersRoute {
	constructor(app: Express) {

    app.route("/v1/users/login").post(
			validateWith(validation.loginFromTelegram),
			usersController.loginWithPhone
		);

		app.route("/v1/users/register/telegram").post(
			validateWith(validation.registrFromTelegram),
			usersController.registrWithTelegram
		)

		app.route("/v1/users").get(usersController.get);
	}
}