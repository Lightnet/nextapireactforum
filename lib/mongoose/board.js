/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16, unixTime} from "../helper";

var BoardSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `var` must be unique
    default: nanoid16
  },
  userid: String,
  username: String,
  parentid: {
    type:String,
    default:'board'
  },
  parenttype:{
    type:String,
    default:'board'
  },
  subject: String,
  content: String,
  idLocked:{
    type:String,
    default:''
  },
  isMature: {
    type:String,
    default:''
  },
  groups: {
    type:String,
    default:''
  },
  isFlag: {
    type:String,
    default:''
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Board', BoardSchema );