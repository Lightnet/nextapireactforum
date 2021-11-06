

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

var PostSchema = new mongoose.Schema({
  id: {
    type:String,
    default: uuidv4
  },
  userid: String,
  username: String,
  parentid: {
    type:String,
    default:'post'
  },
  parenttype:{
    type:String,
    default:'post'
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
  isSpoiler: {
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
mongoose.model('Post', PostSchema );