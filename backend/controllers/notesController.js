const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")


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
        return res.status(400).json({ message: "all fields are required in request body" })
    }
    try {
        await User.findById(user).select("-password").lean().exec()
    } catch {
        return res.status(400).json({message:"There is no user with this ID"})
    } 

    // check for duplicates
    const duplicate = await Note.findOne({ title }).lean().exec()
    if (duplicate) {
        return res.status(400).json({message:"There is already a note with this title"})
    }

    // create and store a new note
    const newNote = await Note.create({ title, text, user })
    if (newNote) {
        res.status(201).json({ message: `New note ${title} created!`})
    } else {
        return res.status(400).json({ message: 'Invalid data recieved'})
    }
})

// @desc update a note
// @route PATCH /note
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const {id, user, title, text, isCompleted} = req.body

    // confirmation of required data
    if (!id || !user || !title || !text || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found in system' }) 
    }

    // check for duplicates
    const duplicate = await Note.findOne({ title }).lean().exec()
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(400).json({ message: "Note with that title already exists" });
    }


    note.title = title
    note.text = text
    note.isCompleted = isCompleted
    note.user = user

    const updatedNote = await note.save()

    res.json({ message: `Updated ${updatedNote.title}.`})
})

// @desc delete note
// @route DELETE /note
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const {id} = req.body

    if (!id) {
        return res.status(400).json({message: 'ID field is required'})
    }

    const note = await Note.findById(id).exec()
    if (!note) {
        return res.status(404).json({message: 'Note not found'})
    }

    const result = await Note.deleteOne({_id: id})

    if (result.deletedCount === 1) {
        res.json({ message: `The note ${id} has been deleted successfully` });
    } else {
        res.status(500).json({ message: "Failed to delete the note" });
    }

    
})

module.exports = {
    getAllNotes,
    createNewNote, 
    updateNote,
    deleteNote
}