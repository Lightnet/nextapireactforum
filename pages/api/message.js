/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react"
import db,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res)=>{

  console.log("MESSAGE");
  const session = await getSession({ req });
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  console.log("method: ",req.method);

  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    console.log(req.body);
    let data = JSON.parse(req.body);
    console.log(data);

  }

  console.log("MESSAGE END")
  return res.json({error:"NOTFOUND"});
};