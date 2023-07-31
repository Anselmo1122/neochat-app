const chatRouter = require("express").Router();

const {
  chatPost,
  chatsGet,
  chatGet,
  chatPut,
	chatPatch,
  chatDelete
} = require("../controllers/chat.controller");

const { check } = require("express-validator");
const { existChatById } = require("../helpers");
const { validateJWT, validateFields } = require("../middlewares");

chatRouter.get("/", chatsGet);

chatRouter.get(
	"/:id",
  [
    check("id", "No es un id válido.").isMongoId(),
    check("id").custom(existChatById),
    validateFields,
  ],
  chatGet
)

chatRouter.post("/create",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  chatPost
);

chatRouter.put(
	"/:id",
	[
		validateJWT,
		check("id", "No es un id válido.").isMongoId(),
		check("id").custom(existChatById),
		check("name", "El nombre nuevo es obligatorio").not().isEmpty(),
		validateFields,
	],
	chatPut
);

// Actualización de mensajes del Chat.

chatRouter.patch(
	"/:id",
	[
		validateJWT,
		check("id", "No es un id válido.").isMongoId(),
		check("id").custom(existChatById),
		check("name", "El nombre nuevo es obligatorio").not().isEmpty(),
		validateFields,
	],
	chatPatch
)

chatRouter.delete(
	"/:id",
	[
		validateJWT,
		// hasRole("ADMIN_ROLE"),
		check("id", "No es un id válido.").isMongoId(),
		check("id").custom(existChatById),
		validateFields,
	],
	chatDelete
);

module.exports = chatRouter;