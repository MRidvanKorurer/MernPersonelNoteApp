const express = require("express");
const {
  getAllNote,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");
const NoteValidation = require("../middlewares/validations/noteValidation");
const authMiddleware = require("../middlewares/authMidllewares");

const router = express.Router();

router.get("/", authMiddleware, getAllNote);

router.get("/:id", authMiddleware, getSingleNote);

router.post("/", NoteValidation.create, authMiddleware, createNote);

router.put("/:id", NoteValidation.update, authMiddleware, updateNote);

router.delete("/:id", authMiddleware,deleteNote);

module.exports = router;
