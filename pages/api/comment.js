/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db from "../../lib/database";
import { isEmpty } from "../../lib/helper";

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

  const Comment = db.model('Comment');

  // config default and other setting later...
  //if(req.method == 'GET'){
    //let commments = await Comment.find({parenttype:'post'}).exec();
    //console.log(posts);
    //return res.json({message:"commments",commments:commments});
  //}

  //need to config build later for other setting
  if(req.method == 'POST'){
    var commentData = JSON.parse(req.body);
    console.log("commentData");
    console.log(commentData);
    if(commentData.commentid){ //need to check exist
      if(commentData.action == 'UPDATE'){
        let query ={
          id:commentData.commentid
        };
        let update={
          subject: commentData.subject,
          content: commentData.content
        }
        const doc = await Comment.findOneAndUpdate(query, update,{ new: true } )
        console.log(doc);
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
        return res.json({message:"UPDATE",comment:doc});
      }
      if(commentData.action == 'DELETE'){
        const deleteComment = await Comment.deleteOne({id:commentData.commentid}).exec();
        return res.json({action:"DELETE",id:commentData.commentid});
      }
    }

    if(commentData.postid){
      if(commentData.action == 'CREATE'){
        if(isEmpty(commentData.subject) || isEmpty(commentData.content)){
          console.log("EMPTY!");
          return res.json({message:"EMPTY"});
        }
        
        let comment = new Comment({
          userid:userid
          , parentid:commentData.postid
          , parenttype:"post"
          , username: username
          , subject: commentData.subject
          , content: commentData.content
        });
        try{
          let saveComment = await comment.save();
          console.log(saveComment);
          return res.json({message:"CREATED",comment:saveComment});
          //return res.json({message:"CREATED"});
        }catch(e){
          return res.json({message:"FAIL"});
        }
      }

      if(commentData.action == 'getcomments'){
        console.log("commentData.postid: ",commentData.postid)
        let comments = await Comment.find({parentid:commentData.postid}).exec();
        if(comments.length == 0){
          return res.json({message:"NOCOMMENT"});
        }
        if(comments.length >= 1){
          return res.json({message:"COMMENTS",comments:comments});
        }
      }
      return res.json({message:"FAIL"});
    }else{
      return res.json({message:"FAIL"});
    }
  }
  //return res.json({error:"NOTFOUND"});
};