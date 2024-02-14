const Note = require("../models/note");
const mongoose = require("mongoose");

const getAllNote = async (req, res) => {
  try {
    const user_id = req.user._id;

    const notes = await Note.find({user_id});

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "ID geçersiz" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Not bulunamadı" });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = req.user._id;
    const newNote = await Note.create({title, description, user_id});

    res.status(201).json({
      success: true,
      newNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "ID geçersiz" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "ID geçersiz" });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllNote,
  getSingleNote,
  createNote,
  deleteNote,
  updateNote,
};
