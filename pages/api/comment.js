/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  //console.log("session: ",session);
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Comment = db.model('Comment');

  // config default and other setting later...
  //if(req.method == 'GET'){
    //let commments = await Comment.find({parenttype:'post'}).exec();
    //console.log(posts);
    //return res.json({action:"commments",commments:commments});
  //}

  //need to config build later for other setting
  if(req.method == 'POST'){
    //var commentData = JSON.parse(req.body);
    let commentData = req.body;
    //console.log("commentData");
    //console.log(commentData);

    if(commentData.postid){
      if(commentData.action == 'CREATE'){
        if(isEmpty(commentData.content)){
          //console.log("EMPTY!");
          return res.json({action:"EMPTY"});
        }
        
        let comment = new Comment({
          userid:userid
          , parentid:commentData.postid
          , parenttype:"post"
          , username: username
          , content: commentData.content
        });
        try{
          let saveComment = await comment.save();
          //console.log(saveComment);
          return res.json({action:"CREATE",doc:saveComment});
          //return res.json({action:"CREATED"});
        }catch(e){
          return res.json({error:"FAILCREATECOMMENT"});
        }
      }

      if(commentData.action == 'COMMENTS'){//get comments
        try{
          //console.log("commentData.postid: ",commentData.postid)
          let comments = await Comment.find({parentid:commentData.postid}).exec();
          if(comments.length == 0){
            return res.json({action:"NOCOMMENT"});
          }
          if(comments.length >= 1){
            return res.json({action:"COMMENTS",comments:comments});
          }
        }catch(e){
          return res.json({error:"FAILDCOMMENTS"});
        }
      }
    }
  }

  if(req.method == 'PATCH'){
    let commentData = req.body;
    try{
      let query ={
        id:commentData.commentid
      };
      let update={
        content: commentData.content
      }
      const doc = await Comment.findOneAndUpdate(query, update,{ new: true } )
      //console.log(doc);
      //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
      return res.json({action:"UPDATE",comment:doc});
    }catch(e){
      return res.json({error:"FAILDELETE"});
    }
  }

  if(req.method == 'DELETE'){
    let commentData = req.body;
    try{
      const deleteComment = await Comment.deleteOne({id:commentData.commentid}).exec();
      return res.json({action:"DELETE",id:commentData.commentid});
    }catch(e){
      return res.json({error:"FAILDELETE"});    
    }
  }

  return res.json({error:"NOTFOUND"});
};