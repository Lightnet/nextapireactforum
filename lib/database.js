/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://stackoverflow.com/questions/24100119/mongoose-connection-events-with-createconnection
// https://stackoverflow.com/questions/44191196/mongoose-create-a-user-schema-and-todo-schema
// https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
//
// https://stackoverflow.com/questions/10987444/how-to-use-global-variable-in-node-js
// https://mongoosejs.com/docs/connections.html
// NEXT API DATABASE
// https://next-auth.js.org/adapters/mongodb


// https://stackoverflow.com/questions/1535631/static-variables-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

//Import the mongoose module
import mongoose from 'mongoose';

import UserSchema from './mongoose/user'

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/my_database';

var db;

//if(!db){
  //db = global.db;
//}
//console.log("database:");
//console.log(db);
/*
function countMyself() {
    // Check to see if the counter has been initialized
    if ( typeof countMyself.counter == 'undefined' ) {
        // It has not... perform the initialization
        countMyself.counter = 0;
    }

    // Do something stupid to indicate the value
    alert(++countMyself.counter);
}
*/

export default async function clientDB(){
  if ( typeof clientDB.db == 'undefined' ) { //not to work
    //console.log("NULL DB");
  }else{
    //console.log(clientDB.db);
    //console.log("FOUND DB");
    //return clientDB.db;
  }
  
  if(db){
    //console.log('REUSED DB');
    //db = global.db || db;
    return db;
  }

  if(global.db){
    return global.db;
  }

  console.log("init DB");
  mongoose.Promise = Promise;
  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  } catch (e) {
    console.log(e);
  }
  //mongoose.model('User', UserSchema);

  require('./mongoose/user');
  require('./mongoose/board');
  require('./mongoose/post');
  require('./mongoose/comment');
  require('./mongoose/forum');
  require('./mongoose/forumpermission');
  require('./mongoose/boardpermission');
  require('./mongoose/userforum');

  require('./mongoose/message');

  //require('./mongoose/community');
  //require('./mongoose/permission');
  //require('./mongoose/settings');

  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    console.log(`DB connected`);
  })
  db.on('connected', () => {
    console.log('connected to mongodb');
  });
  db.on('disconnected', () => {
    console.log('connection disconnected');
  });
  db.on('close', () => {
    console.log('close');
  });
  clientDB.db = db; //static var
  global.db = db;
  return db;
  //return clientDB.db;
}
//export default db;//works
//module.exports = db;// does not work

export async function sessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    if(session){
      if(!session.user.name){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.user.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.user.token){
        const cdb = await clientDB();
        const User = cdb.model('User');
        const user = await User.findOne({username: session.user.name}).exec();
        if(typeof session.user.token == "string"){
          //console.log("STRING DATA...");
          if(user){
            //console.log("FOUND???");
            let bcheck = user.checkToken(session.user.token);
            //console.log("TOKEN: ", bcheck);
            //console.log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}