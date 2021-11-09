/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.youtube.com/watch?v=Hixx31BX5kY
// https://newbedev.com/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting-selected-on-option

import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";
import TopicSection from "./post/postsection";
import CommentSection from "./comment/commentsection";

import NewForum from "./newforum";

export default function component(){
  //forum
  const [isNewForum, setIsNewForum] = useState(false);
  const [forums, setFourms] = useState([]); //use
  const [forumID, setFourmID] = useState('DEFAULT'); // use

  //board
  const [boards, setBoards] = useState([]); //  use
  const [boardID, setBoardID] = useState(null); // use
  const [isBoard, setIsBoard] = useState(false);

  //post ? 
  const [isPost, setIsPost] = useState(false); // use
  const [posts, setPosts] = useState([]); //  use
  const [postID, setPostID] = useState(null); // use


  const [isComment, setIsComment] = useState(false); // use
  const [comments, setComments] = useState([]); // use

  useEffect(()=>{
    //setBoards([]);
    console.log("init setup");
    getForums();
  },[]);

  useEffect(()=>{
    //setBoards([]);
    console.log("forumID change");
    console.log(forumID);
    if(forumID !='DEFAULT'){
      getBoards();
      setIsBoard(true);
    }else{
      setIsBoard(false);
    }
  },[forumID]);

  //check for board id selected for post display
  useEffect(()=>{
    console.log("SELECT BOARD ID: ",boardID);
    if(boardID){
      setIsBoard(false);
      setIsPost(true);
      getPosts();
    }
  },[boardID]);

  //check for post id selected for comment display
  useEffect(()=>{
    console.log("SELECT POST ID: ",postID);
    if(postID){
      setIsPost(false);
      setIsComment(true);
      getComments();
    }
  },[postID]);



  async function getForums(){
    let res = await fetch('api/forum',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
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
    console.log(data);
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
    console.log("LOAD POSTS????");
    let res = await fetch('api/post',{
      method:'POST'
      , body: JSON.stringify({boardid:boardID,action:'getposts'})
    });

    let data = await res.json();
    console.log(data);
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
    console.log("[[[=== LOAD COMMENTS ===]]]");
    let res = await fetch('api/comment',{
      method:'POST'
      , body: JSON.stringify({postid:postID,action:'getcomments'})
    });

    let data = await res.json();
    console.log(data);
    if(data.message=="NOCOMMENT"){
      console.log("NO COMMENT")
      return;
    }
    if(data.message=="COMMENTS"){
      console.log("COMMENTS")
      setComments(data.comments);
    }
  }


  function createForum(){
    setIsNewForum(isNewForum ? false : true)
  }

  function onChangeForum(e){
    //console.log(e.target.value);
    //console.log("forumID");
    setFourmID(e.target.value);
    //console.log(forumID);
  }

  function getForumID(){
    console.log(forumID);
  }

  // link select board ID
  function selectBoardID(id){
    console.log("selectBoardID: ",id);
    setBoardID(id);
  }

  function checkForumBoard(){
    if(isBoard){
      return( <BoardSection boards={boards} forumid={forumID} selectBoard={selectBoardID} />);
    }else{
      return( <label> Board Empty! </label> );
    }
  }

  // link select board ID
  function selectPostID(id){
    console.log("selectPostID: ",id);
    setPostID(id);
  }

  function checkForumPost(){
    if(isPost){
      return( <TopicSection posts={posts} boardid={boardID} selectPost={selectPostID} />);
    }else{
      return( <label> Topic Empty! </label> );
    }
  }

  // link select board ID
  function selectCommentID(id){
    console.log("selectCommentID: ",id);
    //setCommentID(id);
  }

  function checkForumComment(){
    if(isComment){
      return( <CommentSection comments={comments} postid={postID} selectComment={selectCommentID} />);
    }else{
      return( <label> Comment Empty! </label> );
    }
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

      {checkForumBoard()}
      {checkForumPost()}
      {checkForumComment()}
    </div>
  </>)
}
/*

*/
