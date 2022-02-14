/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import {nanoid16,unixTime} from "../helper";

var BoardPermissionSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `id` must be unique
    default: nanoid16
  },
  userid: String,
  boardid:String, // check for id
  role: {
    type:String,
    default:'USER'
  }, // check for role
  //createboard:{
    //type:Boolean,
    //default:false
  //},

  createpost:{
    type:Boolean,
    default:true
  },
  editpost:{
    type:Boolean,
    default:true
  },
  deletepost:{
    type:Boolean,
    default:true
  },


  createcomment:{
    type:Boolean,
    default:true
  },
  editcomment:{
    type:Boolean,
    default:true
  },
  deletecomment:{
    type:Boolean,
    default:true
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('BoardPermission', BoardPermissionSchema );