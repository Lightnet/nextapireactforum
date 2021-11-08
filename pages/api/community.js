/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db from "../../lib/database";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  console.log(session);
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

  const Community = db.model('Community');
  //console.log(Post);

  // config default and other setting later...
  if(req.method == 'GET'){
    let communities = await Community.find({parenttype:'community'}).exec();
    //console.log(boards);
    return res.json({message:"communitues",communities:communities});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){

    var communityData = JSON.parse(req.body);
    //console.log(boardData);
    let community = new Community({
      userid:userid
      , username: username
      , subject: communityData.subject
      , content: communityData.content
    });
    try {
      let savecommunity = await community.save();

      return res.json({message:"pass"});
    } catch (err) {
      console.log('err' + err);
      return res.json({error:"FAIL"});
    }

    /*
    community.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log("save community");
      return res.json({message:"pass"});
    });
    */
  }

  //return res.json({error:"NOTFOUND"});
};