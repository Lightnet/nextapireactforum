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

  const Board = db.model('Board');
  //console.log(Post);

  // config default and other setting later...
  if(req.method == 'GET'){
    let boards = await Board.find({parenttype:'board'}).exec();
    //console.log(boards);
    return res.json({message:"board",boards:boards});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){
    var boardData = JSON.parse(req.body);
    console.log("CHECK FORUM ID...")
    console.log(boardData);

    if(boardData.boardid){
      if(boardData.action == 'UPDATE'){
        let query ={
          id:boardData.boardid
        };

        let update={
          subject: boardData.subject,
          content: boardData.content
        }

        const doc = await Board.findOneAndUpdate(query, update,{ new: true } )
        console.log(doc);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
        return res.json({message:"UPDATE",board:doc});
      }

      if(boardData.action == 'DELETE'){

        
        return res.json({message:"FAIL"});
      }

    }

    if(boardData.forumid){
      console.log(boardData.forumid)
      console.log(boardData.action)
      if(boardData.action == 'getboards'){
        let boards = await Board.find({parentid:boardData.forumid}).exec();
        console.log("CHECK BOARDS...");
        if(boards.length == 0){
          return res.json({message:"NOBOARD"});
        }
        if(boards.length >= 1){
          return res.json({message:"BOARDS",boards:boards});
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
          await board.save();
          console.log("CREATE BOARD");
          return res.json({message:"pass"});
        }catch(e){
          console.log("FAIL CREATE BOARD");
          return res.json({message:"FAIL"});
        }
      }

    }
  }

  //return res.json({error:"NOTFOUND"});
};