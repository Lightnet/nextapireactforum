/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db from "../../lib/database";
import { isEmpty } from "../../lib/helper";
import { log } from "../../lib/log";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  //console.log(session);
  log(session);
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

  //schema
  const Forum = db.model('Forum');

  // config default and other setting later...
  if(req.method == 'GET'){
    let forums = await Forum.find({parenttype:'forum'}).exec();
    //console.log(boards);
    return res.json({message:"forums",forums:forums});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){
    console.log("FORUM");
    let forumData = JSON.parse(req.body);
    console.log(forumData)

    if(isEmpty(forumData.subject) || isEmpty(forumData.content)){
      console.log("EMPTYFIELD");
      return res.json({error:"EMPTYFIELD"});
    }
    
    //console.log(boardData);
    let forum = new Forum({
      userid:userid
      , username: username
      , subject: forumData.subject.trim()
      , content: forumData.content.trim()
    });
    try {
      let saveForum = await forum.save();
      return res.json({message:"CREATED",forum:saveForum});
    } catch (err) {
      //console.log('err' + err);
      return res.json({error:"FAIL"});
    }
  }
  //return res.json({error:"NOTFOUND"});
};