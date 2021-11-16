/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  console.log(session);
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  const Post = db.model('Post');
  //console.log(Post);

  // config default and other setting later...
  if(req.method == 'GET'){
    let posts = await Post.find({parenttype:'post'}).exec();
    //console.log(posts);
    return res.json({action:"posts",posts:posts});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){
    var postData = JSON.parse(req.body);
    console.log(postData);
    if(postData.postid){
      if(postData.action == 'UPDATE'){
        let query ={
          id:postData.postid
        };
        let update={
          subject: postData.subject,
          content: postData.content
        }
        const doc = await Post.findOneAndUpdate(query, update,{ new: true } )
        console.log(doc);
        //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
        return res.json({action:"UPDATE",post:doc});
      }
      if(postData.action == 'DELETE'){
        const deleteComment = await Post.deleteOne({id:postData.postid}).exec();
        const Comment = db.model('Comment');

        //delete Comments if exist
        let deleteComments = await Comment.deleteMany({parentid:postData.postid}).exec();
        console.log("delete Comments:");
        console.log(deleteComments);

        return res.json({action:"DELETE",id:postData.postid});
      }
    }

    if(postData.boardid){
      if(postData.action == 'CREATE'){
        if(isEmpty(postData.subject) || isEmpty(postData.content)){
          console.log("EMPTY!");
          return res.json({action:"EMPTY"});
        }
        
        let post = new Post({
          userid:userid
          , parentid:postData.boardid
          , parenttype:"board"
          , username: username
          , subject: postData.subject
          , content: postData.content
        });
        try{
          let savePost = await post.save();
          console.log(savePost);
          return res.json({action:"CREATE",doc:savePost});
        }catch(e){
          return res.json({action:"FAIL"});
        }
      }

      if(postData.action == 'getposts'){
        console.log("postData.boardid: ",postData.boardid)
        let posts = await Post.find({parentid:postData.boardid}).exec();
        if(posts.length == 0){
          return res.json({action:"NOPOST"});
        }
        if(posts.length >= 1){
          return res.json({action:"POSTS",posts:posts});
        }
      }
      return res.json({message:"FAIL"});
    }else{
      return res.json({message:"FAIL"});
    }
  }
  //return res.json({error:"NOTFOUND"});
};