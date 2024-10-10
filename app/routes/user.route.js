const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../helpers/imageUpload");

router.get("/", userController.getAllUsers);
router.post("/", upload.single('image'), userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", upload.single('image'), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
