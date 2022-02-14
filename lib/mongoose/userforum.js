/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16,unixTime} from "../helper";

var UserForumSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  userid:  {
    type:String,
    default: ''
  },
  username:  {
    type:String,
    default: ''
  },
  isregister:  {
    type:Boolean,
    default: true
  },
  forumid:  {
    type:String,
    default: ''
  },
  role: {
    type:String,
    default: 'USER'
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('UserForum', UserForumSchema );