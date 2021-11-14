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

  const Post = db.model('Post');
  //console.log(Post);

  // config default and other setting later...
  if(req.method == 'GET'){
    let posts = await Post.find({parenttype:'post'}).exec();
    //console.log(posts);
    return res.json({message:"posts",posts:posts});
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
        return res.json({message:"UPDATE",post:doc});
      }
      if(postData.action == 'DELETE'){
        const deleteComment = await Post.deleteOne({id:postData.postid}).exec();
        return res.json({action:"DELETE",id:postData.postid});
      }
    }

    if(postData.boardid){
      if(postData.action == 'CREATE'){
        if(isEmpty(postData.subject) || isEmpty(postData.content)){
          console.log("EMPTY!");
          return res.json({message:"EMPTY"});
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
          return res.json({message:"CREATED",post:savePost});
          //return res.json({message:"CREATED"});
        }catch(e){
          return res.json({message:"FAIL"});
        }
      }

      if(postData.action == 'getposts'){
        console.log("postData.boardid: ",postData.boardid)
        let posts = await Post.find({parentid:postData.boardid}).exec();
        if(posts.length == 0){
          return res.json({message:"NOPOST"});
        }
        if(posts.length >= 1){
          return res.json({message:"POSTS",posts:posts});
        }
      }
      return res.json({message:"FAIL"});
    }else{
      return res.json({message:"FAIL"});
    }
  }
  //return res.json({error:"NOTFOUND"});
};