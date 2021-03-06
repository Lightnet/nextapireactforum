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
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Board = db.model('Board');
  //console.log(Post);

  // config default and other setting later...
  //if(req.method == 'GET'){
    //let boards = await Board.find({parenttype:'board'}).exec();
    //console.log(boards);
    //return res.json({action:"board",boards:boards});
  //}

  //need to config build later for other setting
  if(req.method == 'POST'){
    //var boardData = JSON.parse(req.body);
    var boardData = req.body;
    console.log(boardData);

    if(boardData.forumid){
      //console.log(boardData.forumid)
      //console.log(boardData.action)
      if(boardData.action == 'BOARDS'){
        try{
          //console.log("GET BOARDS");
          let boards = await Board.find({parentid:boardData.forumid}).exec();
          if(boards.length == 0){
            return res.json({action:"NOBOARD"});
          }
          if(boards.length >= 1){
            return res.json({action:"BOARDS",boards:boards});
          }
        }catch(e){
          return res.json({error:"FAILBOARDS"});
        }
      }

      if(boardData.action == 'CREATE'){
        let board = new Board({
          userid:userid
          , username: username
          , parentid: boardData.forumid
          , parenttype: 'forum'
          , subject: boardData.subject
          , content: boardData.content
        });
        try{
          let saveBoard = await board.save();
          console.log("CREATE BOARD");
          return res.json({action:"CREATE",doc:saveBoard});
        }catch(e){
          console.log("FAIL CREATE BOARD");
          return res.json({error:"FAILCREATE"});
        }
      }
    }
  }

  if(req.method == 'PATCH'){
    let boardData = req.body;
    let query ={
      id:boardData.boardid
    };
    let update={
      subject: boardData.subject,
      content: boardData.content
    }
    try{
      const doc = await Board.findOneAndUpdate(query, update,{ new: true } )
      //console.log(doc);
      return res.json({action:"UPDATE",board:doc});
    }catch(e){
      //console.log("FAIL UPDATE BOARD");
      return res.json({error:"FAILUPDATE"});
    }
  }

  if(req.method == 'DELETE'){
    let boardData = req.body;
    try{
      const Post = db.model('Post');
      const Comment = db.model('Comment');
      let posts = await Post.find({parentid:boardData.id}).exec();
      if(posts.length > 0){
        for(const post of posts){
          //delete comments from post id
          let deleteComments = await Comment.deleteMany({parentid:post.id}).exec();
          //console.log("deleteComments: ",deleteComments)
        }
      }
      //delete posts from board id
      let deletePosts = await Post.deleteMany({parentid:boardData.id}).exec();
      //console.log("deletePosts: ",deletePosts)
      //delete board
      const deleteBoard = await Board.deleteOne({id:boardData.id}).exec();
      //console.log("deleteBoard:",deleteBoard)

      return res.json({action:"DELETE",id:boardData.id});
    }catch(e){
      //console.log("FAIL UPDATE BOARD");
      return res.json({error:"FAILUPDATE"});
    }
  }

  return res.json({error:"NOTFOUND"});
};