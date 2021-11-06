

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

var BoardSchema = new mongoose.Schema({
  id: {
    type:String,
    default: uuidv4
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
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Board', BoardSchema );