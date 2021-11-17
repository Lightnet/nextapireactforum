/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16, unixTime} from "../helper";

var CommunitySchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `var` must be unique
    default: nanoid16
  },
  userid: String,
  username: String,
  parentid: {
    type:String,
    default:'community'
  },
  parenttype:{
    type:String,
    default:'community'
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
mongoose.model('Community', CommunitySchema );