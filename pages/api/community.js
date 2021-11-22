/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import clientDB,{ sessionTokenCheck } from "../../lib/database";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  //console.log(session);
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  const db = await clientDB();

  const Community = db.model('Community');

  // config default and other setting later...
  if(req.method == 'GET'){
    let communities = await Community.find({parenttype:'community'}).exec();
    //console.log(boards);
    return res.json({action:"communitues",communities:communities});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){

    var communityData = JSON.parse(req.body);
    //console.log(communityData);
    let community = new Community({
      userid:userid
      , username: username
      , subject: communityData.subject
      , content: communityData.content
    });

    try {
      let savecommunity = await community.save();
      return res.json({action:"CREATE",doc:savecommunity});
    } catch (err) {
      console.log('err' + err);
      return res.json({error:"FAIL"});
    }
  }

  return res.json({error:"NOTFOUND"});
};