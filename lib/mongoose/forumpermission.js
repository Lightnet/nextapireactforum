/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16,unixTime} from "../helper";

var ForumPermissionSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  userid: String,
  forumid:String, // check for id
  role:{
    type:String,
    default:'USER'
  },
  createboard:{
    type:Boolean,
    default:false
  },
  deleteboard:{
    type:Boolean,
    default:false
  },
  editboard:{
    type:Boolean,
    default:false
  },
  //createpost:{
    //type:Boolean,
    //default:true
  //},
  //createcomment:{
    //type:Boolean,
    //default:true
  //},
  banUser:{
    type:Boolean,
    default:false
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('ForumPermission', ForumPermissionSchema );