const express = require('express');
const { createNotes, getNotes, deleteNotes, updateNotes } = require('../controllers/notesController')
const{ protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-note',protect, createNotes);
router.get('/get-notes', protect, getNotes);
router.delete('/delete-note/:id',protect, deleteNotes);
router.post('/update-note/:id',protect, updateNotes);

module.exports = router;