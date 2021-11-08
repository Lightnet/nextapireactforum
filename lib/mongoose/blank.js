/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import {nanoid16} from "../helper";

var PostSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  userid: String,
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Post', PostSchema );