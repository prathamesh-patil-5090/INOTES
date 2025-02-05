const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title:{
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: "General",
    },
  },
    {timestamps: true}
);

const Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;