/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.youtube.com/watch?v=Hixx31BX5kY
// https://newbedev.com/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting-selected-on-option

import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";
import PostSection from "./post/postsection";
import CommentSection from "./comment/commentsection";

import NewForum from "./newforum";

export default function component(){
  //forum
  const [isNewForum, setIsNewForum] = useState(false);
  const [forums, setFourms] = useState([]); 
  const [forumID, setFourmID] = useState('DEFAULT');

  //board
  const [boards, setBoards] = useState([]); 
  const [boardID, setBoardID] = useState(null); 
  const [isBoard, setIsBoard] = useState(false);

  //post ? 
  const [isPost, setIsPost] = useState(false); 
  const [posts, setPosts] = useState([]); 
  const [postID, setPostID] = useState(null); 

  //comment
  const [isComment, setIsComment] = useState(false); 
  const [comments, setComments] = useState([]);
  const [commentID, setCommentID] = useState(null); 

  //once init forum
  useEffect(()=>{
    //setBoards([]);
    //console.log("init setup");
    getForums();
  },[]);

  // need to fixed this later 
  // need to check the select type
  useEffect(()=>{
    //setBoards([]);
    //console.log("forumID change");
    //console.log(forumID);
    if(forumID !='DEFAULT'){
      getBoards();
    }else{
      setIsBoard(false);
    }

    if(isBoard){
      getBoards();
    }

    if(isPost){
      getPosts();
    }

    if(isComment){
      getComments();
    }

  },[forumID,isBoard,isPost,isComment]);

  async function getForums(){
    let res = await fetch('api/forum',{
      method:'GET'
    });
    let data = await res.json();
    //console.log(data);
    if(data.error){
      console.log("ERROR GET FORUM ");
      return;
    }
    if(data.message){
      setFourms(data.forums);
    }
  }

  async function getBoards(){
    let res = await fetch('api/board',{
      method:'POST'
      , body: JSON.stringify({forumid:forumID,action:'getboards'})
    });

    let data = await res.json();
    //console.log(data);
    if(data.message=="NOBOARD"){
      console.log("NO BOARDS")
      return;
    }
    if(data.message=="BOARDS"){
      console.log("BOARDS")
      setBoards(data.boards);
    }
  }

  async function getPosts(){
    //console.log("[[[=== LOAD POSTS ===]]]");
    //console.log("[[[=== POSTID ===]]]: ", boardID);
    let res = await fetch('api/post',{
      method:'POST'
      , body: JSON.stringify({boardid:boardID,action:'getposts'})
    });

    let data = await res.json();
    //console.log(data);
    if(data.message=="NOPOST"){
      console.log("NO POST")
      return;
    }
    if(data.message=="POSTS"){
      console.log("POSTS")
      setPosts(data.posts);
    }
  }

  async function getComments(){
    //console.log("[[[=== LOAD COMMENTS ===]]]");
    //console.log("[[[ === POST ID == ]]]", postID)

    let res = await fetch('api/comment',{
      method:'POST'
      , body: JSON.stringify({postid:postID,action:'getcomments'})
    });

    let data = await res.json();
    //console.log(data);
    if(data.message=="NOCOMMENT"){
      console.log("NO COMMENT")
      return;
    }
    if(data.message=="COMMENTS"){
      console.log("COMMENTS")
      setComments(data.comments);
    }
  }

  //display create forum
  function createForum(){
    setIsNewForum(isNewForum ? false : true)
  }

  function onChangeForum(e){
    //console.log(e.target.value);
    //console.log("forumID");
    setFourmID(e.target.value);
    setIsBoard(true);
  }

  function getForumID(){
    console.log(forumID);
  }

  function checkForumBoard(){
    if(isBoard){
      return( <BoardSection boards={boards} forumid={forumID} ops={callBackOPS} />);
    }else{
      if(boardID){
        let board;
        for(let item of boards){
          //console.log("BOARD LIST...");
          //console.log(item);
          if(item.id == boardID){
            board = item;
            break;
          }
        }
        if(board){
          return(
          <label>
            <span> oo </span>
            <a href="#" onClick={()=>callBackOPS({action:"selectboard"})}> [Board]: {board.subject} </a>
          </label>);
        }else{
          return( <label> Board Empty! </label> );
        }
      }
      return( <label> Board Empty! </label> );
    }
  }

  function checkForumPost(){
    if(isPost){
      return( <PostSection posts={posts} boardid={boardID} ops={callBackOPS} />);
    }else{
      if(postID){
        let post;
        for(let item of posts){
          if(item.id == postID){
            post = item;
            break;
          }
        }
        if(post){
          return(
          <label> 
            <span> oo </span> 
            <a href="#" onClick={()=>callBackOPS({action:"selectpost"})}> [Post]: {post.subject} </a>
          </label>);
        }
        return( <label> Post Empty! </label> );
      }
      return( <label> Post Empty! </label> );
    }
  }

  function callBackOPS(args){
    if(args){
      if(args.action){

        if(args.action == "selectindex"){
          setIsBoard(true);
          setIsPost(false);
          setIsComment(false);
          getBoards();
        }

        if(args.action == "selectboard"){
          setIsBoard(false);
          setIsPost(true);
          setIsComment(false);
          //getPosts();
        }

        if(args.action == "selectpost"){
          setIsBoard(false);
          setIsPost(false);
          setIsComment(true);
          //getComments();
        }

        if(args.action == "select"){
          if(args.datatype == "board"){
            //console.log("SELECT BOARD>>>>???");
            setBoardID(args.id);
            setIsBoard(false);
            setIsPost(true);
            setIsComment(false);
          }
          if(args.datatype == "post"){
            setPostID(args.id);
            setIsBoard(false);
            setIsPost(false);
            setIsComment(true);
            //getPosts();
            //getComments();
          }
          if(args.datatype == "comment"){
            setCommentID(args.id);
            setIsBoard(false);
            setIsPost(false);
            setIsComment(true);
          }
        }
      }
    }
  }

  function checkForumComment(){
    if(isComment){
      return( <CommentSection comments={comments} postid={postID} ops={callBackOPS} />);
    }else{
      return( <label> Comment Empty! </label> );
    }
  }

  function checkForumIndexRender(){
    //console.log("forumID: ",forumID);
    //console.log(typeof forumID);
    if(forumID !== "DEFAULT" && forumID != null){
      return (<a href="#" onClick={()=>callBackOPS({action:"selectindex"})}>Index</a>);
    }
    return (<> </>);
  } 

  return(<>
    <div>
      <label>Forum</label>
      <button onClick={createForum}> Create Forum </button>
      <button> Delete Forum </button>
      <button onClick={getForumID}> Forum ID </button>

      {isNewForum && <NewForum />}
      
      <select defaultValue={forumID || "DEFAULT"} onChange={onChangeForum}>
        <option value='DEFAULT' disabled={true}> Choose here </option>
        {forums.map((item)=>{
          return(
            <option key={item.id} value={item.id}> {item.subject} </option>
          )
        })}
      </select>
      <br />
      {checkForumIndexRender()}

      {checkForumBoard()}
      {checkForumPost()}
      {checkForumComment()}
    </div>
  </>)
}
/*

*/
