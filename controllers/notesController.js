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

  //Confirm note exists to update
  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note does not exist" });
  }

  //check for duplicate title
  const duplicate = await Note.findById({ title }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json(`${updatedNote.title} updated`);
});

//@desc delete
//@route DELETE
//@access private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  //confirm data
  if (!id) {
    res.status(400).json({ message: "NoteID required" });
  }

  //Check if note exist
  const note = await Note.findById(id).exec();
  if (!note) {
    res.status(400).json({ message: "Note does not exist" });
  }

  const result = await note.deleteOne();

  const reply = `Note ${result.title} with ID ${result._id} was deleted`;
  res.json(reply);
});

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
