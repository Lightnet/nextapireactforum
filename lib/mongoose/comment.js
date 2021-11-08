/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import {nanoid16} from "../helper";

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