const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc create a new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required'})
    }

    // check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()
    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10) // salt rounds
    const userObject = { username, "password": hashedPassword, roles}

    // create and store new user
    const user = await User.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${username} created!`})
    } else {
        res.status(400).json({ message: 'Invalid user data recieved'})
    }
})

// @desc update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, isActive, password } = req.body

    // confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof isActive !== 'boolean' ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // check for duplicates
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.isActive = isActive
    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt the password
    }

    const updatedUser = await user.save()

    res.json({ message: `Updated ${updatedUser.username}.`})
})

// @desc delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // validate data
    if (!id) {
        res.status(400).json({ message: 'User id is required'})
    }

    // check if user has notes assigned to them
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }

    const result = await User.deleteOne({_id: id})

    if (result.deletedCount === 1) {
        res.json({ message: `The user ${id} has been deleted successfully` });
    } else {
        res.status(500).json({ message: "Failed to delete the User" });
    }
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}