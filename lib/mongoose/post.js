/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16, unixTime} from "../helper";

var PostSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `var` must be unique
    default: nanoid16
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
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Post', PostSchema );