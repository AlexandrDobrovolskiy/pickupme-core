import { Express } from "express";
import { usersController } from "../controllers/users.controller";

import * as validation from '../validation/users';
import { useValidation } from "../utils/validation/use-validation";

export default class UsersRoute {
	constructor(app: Express) {

    app.route("/v1/users/login/telegram").post(
			useValidation(validation.loginFromTelegram),
			usersController.loginWithPhone,
		);

		app.route("v1/users/login/app").post(
			useValidation(validation.loginFromMobile),
			usersController.loginFromMobile,
		);

		app.route("/v1/users/register/app").post(
			useValidation(validation.registerFromMobile),
			usersController.registerWithMobile,
		);

		app.route("/v1/users/register/telegram").post(
			useValidation(validation.registerFromTelegram),
			usersController.registerWithTelegram,
		)
	}
}