const express = require("express");

const { pdfs } = require("../controllers/pdf.controllers");

const pdfRouter = express.Router();

pdfRouter.get('/:name', pdfs)

module.exports = pdfRouter;