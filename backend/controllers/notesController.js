const asyncHandler = require('express-async-handler');
const Notes = require('../models/Notes');

//Create notes
const createNotes = asyncHandler(async (req, res) => {
    const { title, content, tag } = req.body;
    console.log(req.user._id);
    const notes = await Notes.create({
        user: req.user._id,
        title,
        content,
        tag
    });
    if(notes){
        res.status(201).json({
            id: req.user._id,
            title: notes.title,
            content: notes.content,
            tag: notes.tag,
        });
    }else{
        res.status(400);
        throw new Error("Invalid Note!")
    }
});

//Update a note
const updateNotes = asyncHandler(async (req, res, err) => {
    try{
        const id = req.params.id;
        const { title, content, tag } = req.body;
        const notes = {
            user: req.user._id,
            title,
            content,
            tag
        };
        console.log(notes);
        const updatedNote = await Notes.findByIdAndUpdate(id,
            {
                title: notes.title,
                content: notes.content,
                tag: notes.tag,
            }
        );
        res.status(201).json(notes);
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
});

//Get Notes
const getNotes = asyncHandler(async (req, res, err) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.status(201).json(notes);
    }catch(err){
        res.status(404);
        throw new Error("Note not found!")
    }
});

//Delete Note
const deleteNotes = asyncHandler(async (req, res, err) => {
    try{
        const notes = await Notes.findByIdAndDelete({_id: req.params.id});
        console.log(notes);
        res.status(201).json(notes);
    }catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
});
module.exports = { createNotes, getNotes, deleteNotes, updateNotes };