

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

var PostSchema = new mongoose.Schema({
  id: {
    type:String,
    default: uuidv4
  },
  userid: String,
  username: String,
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Post', PostSchema );