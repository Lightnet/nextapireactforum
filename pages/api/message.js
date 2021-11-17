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
  const Message = db.model('Message');;

  if(req.method == 'GET'){
    const messages = await Message.find({recipientid:userid}).exec();
    // need to conver for user only read
    return res.json({action:"MESSAGES",messages:messages});
  }

  if(req.method == 'POST'){
    console.log(req.body);
    let data = req.body;
    //check user exist

    console.log(data);
    const newMessage = new Message({
      fromid:userid,
      recipientid:data.sentID,
      subject:data.subject,
      content:data.content,
    });

    //newMessage.encode function....

    const saveMessage = await newMessage.save();
    console.log("saveMessage:",saveMessage)

    return res.json({action:"CREATE"});
  }

  if(req.method == 'DELETE'){
    console.log(req.body);
    let data = req.body;

    let deleteMessage = await Message.findOneAndDelete({id:data.id}).exec();
    console.log("deleteMessage: ",deleteMessage);
    return res.json({action:"DELETE",id:data.id});
  }
  console.log("MESSAGE END")
  return res.json({error:"NOTFOUND"});
};