const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")


// @desc Get all Notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    notes = await Note.find().lean()
    if (!notes?.length) {
        res.status(400).json({ message: "No notes found" })
    }
    res.send(notes)
})

// @desc create a new note
// @route POST /note
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { title, user, text } = req.body

    // confirm data
    if (!title || !user || !text) {
        res.status(400).json({ message: "all fields are required in request body" })
    }

    // check for duplicates
    const duplicate = await Note.findOne({ title }).lean().exec()
    if (duplicate) {
        res.status(400).json({message:"There is already a note with this title"})
    }

    // create and store a new note
    const newNote = await Note.create({ title, text, user })
    if (newNote) {
        res.status(201).json({ message: `New note "${title}" created!`})
    } else {
        res.status(400).json({ message: 'Invalid data recieved'})
    }
})

// @desc update a note
// @route PATCH /note
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    console.log("note updated")
})

// @desc delete note
// @route DELETE /note
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    console.log("note deleted")
})

module.exports = {
    getAllNotes,
    createNewNote, 
    updateNote,
    deleteNote
}