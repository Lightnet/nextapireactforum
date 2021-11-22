/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://nextjs.org/docs/api-routes/response-helpers

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";

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

  const db = await clientDB();

  if(req.method == 'GET'){
    return res.json({error:"GET FOUND"});
  }

  if(req.method == 'POST'){
    console.log(req.body);
    //return res.end();
    //throw new Error('message test error');
    return res.json({error:"POST FOUND"});
  }

  if(req.method == 'PUT'){
    console.log(req.body);
    return res.json({error:"PUT FOUND"});
  }

  if(req.method == 'PATCH'){
    console.log(req.body);
    return res.json({error:"PATCH FOUND"});
  }

  if(req.method == 'DELETE'){
    console.log(req.body);
    return res.json({error:"DELETE FOUND"});
  }

  return res.json({error:"NOTFOUND"});
};