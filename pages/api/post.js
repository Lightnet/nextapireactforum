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
  //console.log("session: ",session);
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const Post = db.model('Post');
  //console.log(Post);

  // config default and other setting later...
  //if(req.method == 'GET'){
    //let posts = await Post.find({parenttype:'post'}).exec();
    //console.log(posts);
    //return res.json({action:"posts",posts:posts});
  //}

  //need to config build later for other setting
  if(req.method == 'POST'){
    var postData = req.body;
    //console.log(postData);

    if(postData.boardid){
      if(postData.action == 'CREATE'){
        if(isEmpty(postData.subject) || isEmpty(postData.content)){
          //console.log("EMPTY!");
          return res.json({error:"EMPTY"});
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
          //console.log(savePost);
          return res.json({action:"CREATE",doc:savePost});
        }catch(e){
          return res.json({error:"FAIL"});
        }
      }

      if(postData.action == 'POSTS'){
        //console.log("postData.boardid: ",postData.boardid)
        try{
          let posts = await Post.find({parentid:postData.boardid}).exec();
          if(posts.length == 0){
            return res.json({action:"NOPOST"});
          }
          if(posts.length >= 1){
            return res.json({action:"POSTS",posts:posts});
          }
        }catch(e){
          return res.json({error:"FAILPOSTS"});    
        }
      }
    }
  }

  if(req.method == 'PATCH'){
    var postData = req.body;
    let query ={
      id:postData.postid
    };
    let update={
      subject: postData.subject,
      content: postData.content
    }
    try{
      const doc = await Post.findOneAndUpdate(query, update,{ new: true } )
      //console.log(doc);
      //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
      return res.json({action:"UPDATE",post:doc});
    }catch(e){
      return res.json({error:"FAILUPDATE"});    
    }
  }

  if(req.method == 'DELETE'){
    let postData = req.body;
    try{
      const deleteComment = await Post.deleteOne({id:postData.postid}).exec();
      const Comment = db.model('Comment');

      //delete Comments if exist
      let deleteComments = await Comment.deleteMany({parentid:postData.postid}).exec();
      //console.log("delete Comments: ", deleteComments);

      return res.json({action:"DELETE",id:postData.postid});
    }catch(e){
      return res.json({error:"FAILDELETE"});    
    }
  }

  return res.json({error:"NOTFOUND"});
};