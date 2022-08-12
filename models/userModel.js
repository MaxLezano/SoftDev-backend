const { Schema, model } = require('mongoose')

const userShema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  imgProfile: String,
  contactNumber: {
    type: Number,
    trim: true
  },
  creationDate: {
    type : Date,
    default: Date.now()
  },
  address: {
    type: String,
    trim: true
  },
  postalCode: {
    type: Number,
    trim: true
  },
  favorites: {
    type: Array,
    default: []
  },
  cart: {
    type: Array,
    default: []
  },
  isAproved: {
    type: Boolean,
    default: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = model('user', userShema);