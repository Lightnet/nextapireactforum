/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

//Require Mongoose
import mongoose from 'mongoose';

// crypto 
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {nanoid16, unixTime } from '../helper';
//var secret = require('../config').secret;
var secret = process.env.SECRET || "secret";

//Define a schema
//var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  id: {
    type:String,
    unique: true, // `var` must be unique
    default: nanoid16
  },
  username: String,
  //passphrase: String,
  email: {
    type:String,
    default:''
  },
  title: {
    type:String,
    default:'none'
  },
  rank: {
    type:String,
    default:'none'
  },
  role: {
    type:String,
    default:'USER'
  },
  access: {
    type:String,
    default:'USER'
  },
  groups: {
    type:String,
    default:''
  },
  token: {
    type:String,
    default:''
  },
  bio: {
    type:String,
    default:''
  },
  image: {
    type:String,
    default:''
  },
  hash: String, //password
  salt: String, //auto gen password key
  date:{
    type:Number,
    default:unixTime
  }
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    name: this.username,
    exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

UserSchema.methods.toAuthJSON = function(){
  return {
    name: this.username
    //, email: this.email
    , token: this.generateJWT()
    //, bio: this.bio
    //, image: this.image
  };
}

UserSchema.methods.checkToken = function(token){
  // invalid token - synchronous
  try {
    //var decoded = jwt.verify(token, 'wrong-secret');//check fail
    var decoded = jwt.verify(token, secret);
    if(decoded){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    // err
    return false;
  }
}

// Compile model from schema
mongoose.model('User', UserSchema );

//var User = mongoose.model('User', UserSchema );
//export default User;
// user.validPassword(password)