/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react"
import db from "../../lib/database";

export default async (req, res)=>{

  console.log("MESSAGE");
  const session = await getSession({ req });
  let userid;
  let username;

  if(session){
    if(!session.user.name){
      return res.json({error:"FAIL"});  
    }
    if(!session.user.token){
      return res.json({error:"FAIL"});  
    }

    if(session.user.token){
      const User = db.model('User');
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
            userid = user._id;
            username = user.username;
          }else{
            return res.json({error:"FAIL"});
          }
        }else{
          return res.json({error:"FAIL"});
        }
      }
    }
  }else{
    return res.json({error:"FAIL"});
  }

  console.log(req.method);
  if(req.method == 'POST'){
    console.log(req.body);
    let data = JSON.parse(req.body);
    console.log(data);

  }

  console.log("MESSAGE END")
  return res.json({error:"NOTFOUND"});
};