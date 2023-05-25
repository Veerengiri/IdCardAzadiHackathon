const mongoose = require("mongoose");

const reguser = new mongoose.Schema({
  userId: {
    type: String,
    // required: true
  },
  gname: {
    type: String,
    required: true,
  },
  name: {
    type: Array,
    required: true,
  },
  tnartist: {
    type: Number,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  TOP: {
    type: String,
  },
  FOICD: {
    type: String,
    required: true,
  },
  DOA: {
    type: String,
    required: true,
  },
  vlink: {
    type: String,
  },
  level: {
    type: Number,
    default: 0,
  },
  // test:{
  //     type: Number,
  //     default:0
  // },
  applyDay: {
    type: String,
    required: true,
  },
  applyMonth: {
    type: String,
    required: true,
  },
  applyYear: {
    type: String,
    required: true,
  },
  fulltime: {
    type: String,
    required: true,
  },
  gphoto: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    required: true,
  },
  adhar: {
    type: String,
    required: true,
  },
  sign: {
    type: String,
    required: true,
  },
  aphy: {
    type: Boolean,
    default: false,
    require: true,
  },
  govpho: {
    type: String,
    require: true,
  },
  PEON: {
    type: String,
    required: true,
  },
  officer: {
    type: String,
    required: true,
  },
  commisioner: {
    type: String,
    required: true,
  },
});

const newReg = mongoose.model("registeruser2", reguser);

module.exports = newReg;
