import { Express } from "express";
import { usersController } from "../controllers/users.controller";

import { useValidation } from "../utils/validation/use-validation";
import * as validation from '../validation/users';
import * as Routes from './routes';

export default class UsersRoute {
	constructor(app: Express) {
		app
			.route(Routes.Users.REGISTER_APP)
			.post(
				useValidation(validation.registerFromMobile),
				usersController.registerWithMobile,
			);

		app
			.route(Routes.Users.REGISTER_TELEGRAM)
			.post(
				useValidation(validation.registerFromTelegram),
				usersController.registerWithTelegram,
			)

		app
			.route(Routes.Users.LOGIN_TELEGRAM)
			.post(
				useValidation(validation.loginFromTelegram),
				usersController.loginWithPhone,
			);

		app
			.route(Routes.Users.LOGIN_APP)
			.post(
				useValidation(validation.loginFromMobile),
				usersController.loginFromMobile,
			);
	}
}