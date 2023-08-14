const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//@desc get all notes
//@route GET/notes
//@access private

const getAllNotes = asyncHandler(async (req, res) => {
  //get all notes from MongoDB
  const notes = await Note.find().lean();

  //if no notes are there
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }
  res.json(notes);
});

//@desc create new note
//@route POST/notes
//@access public
