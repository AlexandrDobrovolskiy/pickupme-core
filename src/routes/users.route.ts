import { Express } from "express";
import { usersController } from "../controllers/users.controller";

import * as validation from '../validation/users';
import { useValidation } from "../utils/validation/use-validation";

export default class UsersRoute {
	constructor(app: Express) {

    app.route("/v1/users/login").post(
			useValidation(validation.loginFromTelegram),
			usersController.loginWithPhone
		);

		app.route("/v1/users/register/telegram").post(
			useValidation(validation.registrFromTelegram),
			usersController.registrWithTelegram
		)

		app.route("/v1/users").get(usersController.get);
	}
}