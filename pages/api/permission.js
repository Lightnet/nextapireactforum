/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res)=>{

  const session = await getSession({ req });
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){

  }

  return res.json({error:"NOTFOUND"});
};