const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

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

  //Add username to each note before sending

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
  res.json(notesWithUser);
});

//@desc create new note
//@route POST/notes
//@access private

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;
  //confirm info
  if (!user || !title || !text) {
    res.status(400).json({ message: "All fields are required" });
  }

  //check for dupilcate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate) {
    res.status(409).json({ message: "Dupliate note title" });
  }

  //create and store new note
  const note = await Note.create({ user, title, text });

  if (note) {
    return res.status(201).json({ message: "New note created" });
  } else {
    return res.status(400).json({ message: "Invalid note data recived" });
  }
});

// @desc Update a note
// @route PATCH /notes
// @access Private

const updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  //Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    res.status(400).json({ message: "All the fields are required" });
  }

  //
});
