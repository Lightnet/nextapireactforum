/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import {nanoid16} from "../helper";

var PermissionSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  group: {
    type:String,
    default: ''
  },
  role: {
    type:String,
    default: 'USER'
  },
  title: {
    type:String,
    default: 'USER'
  },
  tagid: {
    type:String,
    default: ''
  },
  type: {
    type:String,
    default: 'forum'
  },
  write: {
    type:Boolean,
    default: true
  },
  writeother: {
    type:Boolean,
    default: true
  },
  read: {
    type:Boolean,
    default: true
  },
  readother: {
    type:Boolean,
    default: true
  },
  update: {
    type:Boolean,
    default: true
  },
  updateother: {
    type:Boolean,
    default: true
  },
  delete: {
    type:Boolean,
    default: true
  },
  deleteother: {
    type:Boolean,
    default: true
  },
  move: {
    type:Boolean,
    default: true
  },
  moveother: {
    type:Boolean,
    default: true
  },
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});


// Compile model from schema
mongoose.model('Permission', PermissionSchema );