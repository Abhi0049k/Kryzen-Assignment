const { Router } = require("express");
const authorization = require("../middlewares/authorization.middleware");
const submitForm = require("../controllers/form.controllers");
require('dotenv').config();

const formRouter = Router();


formRouter.post('/submit-form', authorization, submitForm)

module.exports = formRouter;