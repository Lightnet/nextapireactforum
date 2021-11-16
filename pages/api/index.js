/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://nextjs.org/docs/api-routes/response-helpers

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";

export const config = {
  api: {
    bodyParser: true
  }
};

export default async (req, res)=>{
  console.log("MOD");
  const session = await getSession({ req });

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  if(req.method == 'GET'){
    return res.json({error:"GETFOUND"});
  }

  if(req.method == 'POST'){
    console.log(req.body);
    //return res.end();
    return res.json({error:"POSTFOUND"});
  }

  return res.json({error:"NOTFOUND"});
};