const { Schema, model } = require('mongoose')

const userShema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
  },

  isAproved: {
   type: Boolean,
   default: false,
   required: true
  },

  nameCompleted: {
  type: String,
  required:true,
  trim: true
  },

  numberContact: {
    type: Number,
    required: true,
    trim: true
  },

  codigoPostal: {
    type: Number,
    required: true,
    trim: true
  },

  direction: {
    type: String,
    required: true,
    trim: true
  },

  dateCreated: {
    type : Date,
    default: Date.now()
  }
})

module.exports = model('user', userShema)