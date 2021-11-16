/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper";
import { log } from "../../lib/log";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req });
  log(session);
  
  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  //schema
  const Forum = db.model('Forum');

  // config default and other setting later...
  if(req.method == 'GET'){
    log("GET FOURMS")
    let forums = await Forum.find({parenttype:'forum'}).exec();
    //console.log(forums);
    return res.json({message:"forums",forums:forums});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){
    console.log("FORUM");
    let forumData = JSON.parse(req.body);
    console.log(forumData)

    if(forumData.action=='UPDATE'){
      if(isEmpty(forumData.subject) || isEmpty(forumData.content)){
        console.log("EMPTYFIELD");
        return res.json({error:"EMPTYFIELD"});
      }

      let query ={
        id:forumData.forumid
      };

      let update={
        subject: forumData.subject,
        content: forumData.content
      }

      const doc = await Forum.findOneAndUpdate(query, update,{ new: true } )
      console.log(doc);
      console.log(doc);
      return res.json({action:"UPDATE",forum:doc});
    }

    if(forumData.action=='CREATE'){
      //console.log(boardData);
      if(isEmpty(forumData.subject) || isEmpty(forumData.content)){
        console.log("EMPTYFIELD");
        return res.json({error:"EMPTYFIELD"});
      }
      let forum = new Forum({
        userid:userid
        , username: username
        , subject: forumData.subject.trim()
        , content: forumData.content.trim()
      });
      try {
        let saveForum = await forum.save();
        return res.json({action:"CREATE",forum:saveForum});
      } catch (err) {
        //console.log('err' + err);
        return res.json({error:"FAIL"});
      }
    }

    if(forumData.action=='DELETE'){
      const Board = db.model('Board');
      const Post = db.model('Post');
      const Comment = db.model('Comment');

      let boards = await Board.find({parentid:forumData.forumid}).exec();

      if(boards.length > 0){
        for(const board of boards){
          let posts = await Post.find({parentid:board.id}).exec();
          if(posts.length > 0){
            for(const post of posts){
              //delete comments from post id
              let deleteComments = await Comment.deleteMany({parentid:post.id}).exec();
              console.log("deleteComments: ",deleteComments)
            }
          }
          //delete posts from board id
          let deletePosts = await Post.deleteMany({parentid:board.id}).exec();
          console.log("deletePosts: ",deletePosts)
        }
      }

      //delete boards from forum id
      const deleteBoards = await Board.deleteMany({parentid:forumData.forumid}).exec();
      console.log("deleteBoard:",deleteBoards)

      //delete forum by id
      let deleteForum = await Forum.deleteOne({id:forumData.forumid}).exec();
      console.log("deleteForum:", deleteForum);

      return res.json({action:"DELETE",id:forumData.forumid});
    }
  }

  return res.json({error:"NOTFOUND"});
};