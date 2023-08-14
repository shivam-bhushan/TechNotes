const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");

router.route("/").get().post().patch().delete();

module.exports = router;
