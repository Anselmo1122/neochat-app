const authRouter = require("express").Router();

const { check } = require("express-validator");
const { authPost, authFacebook } = require("../controllers/auth.controller");

const validateFields = require("../middlewares/validateFields");

const { existEmailLogin, isUserActive } = require("../helpers/dbValidators");

authRouter.post(
	"/login",
	[
		check("email", "El email es obligatorio.").isEmail(),
		check("email").custom(existEmailLogin),
		check("email").custom(isUserActive),
		check("password", "El password es obligatorio.").not().isEmpty(),
		validateFields,
	],
	authPost
);

authRouter.post(
	"/facebook",
	[
		check("fb_token", "Token de facebook necesario.").not().isEmpty(),
		validateFields,
	],
	authFacebook
);

module.exports = authRouter;
