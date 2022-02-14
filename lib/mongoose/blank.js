/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16,unixTime} from "../helper";

var BlankSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  userid: String,
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Blank', BlankSchema );