/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This will handle forum data and handle events.

*/

// https://www.youtube.com/watch?v=Hixx31BX5kY
// https://newbedev.com/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting-selected-on-option

import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";
import PostSection from "./post/postsection";
import CommentSection from "./comment/commentsection";

import NewForum from "./newforum";
import NewBoard from "./board/newboard";
import NewPost from "./post/newpost";
import NewComment from "./comment/newcomment";

import EditForum from "./editforum";
import EditBoard from './board/editboard';
import EditPost from './post/editpost';
import EditComment from './comment/editcomment';

import ForumNavBar from "./forumnavbar";
import Modal from '../ui/modal';
import DeleteComment from './comment/deletecomment';
import DeletePost from './post/deletepost';
import DeleteBoard from './board/deleteboard';
import DeleteForum from './deleteforum';

export default function component(){

  //forum
  const [forums, setForums] = useState([]); 
  const [forumID, setForumID] = useState('DEFAULT');

  //board
  const [boards, setBoards] = useState([]); 
  const [boardID, setBoardID] = useState(null); 
  const [isBoard, setIsBoard] = useState(false);
  
  //post 
  const [isPost, setIsPost] = useState(false); 
  const [posts, setPosts] = useState([]); 
  const [postID, setPostID] = useState(null); 

  //comment
  const [isComment, setIsComment] = useState(false); 
  const [comments, setComments] = useState([]);
  const [commentID, setCommentID] = useState(null);

  //modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataTypeModal, setDataTypeModal] = useState(null); // forum, board, post, commment
  const [dataModeModal, setDataModeModal] = useState(null); // edit, delete, move?
  const [editID, setEditID] = useState(null);

  const [messageModal, setMessageModal] = useState("None Message!"); // edit, delete, move?

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
    //console.log(data.message);
    if(data.message == "forums"){
      if(data.forums){
        setForums(data.forums);
      }
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

  function onChangeForum(e){
    //console.log(e.target.value);
    //console.log("forumID");
    setForumID(e.target.value);
    setIsBoard(true);
  }

  function renderBoards(){
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

  function renderPosts(){
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
          }
          if(args.datatype == "comment"){
            setCommentID(args.id);
            setIsBoard(false);
            setIsPost(false);
            setIsComment(true);
          }
        }

        if(args.action == "upvote"){
          if(args.datatype == "board"){

          }
          if(args.datatype == "post"){

          }
          if(args.datatype == "comment"){

          }
        }

        if(args.action == "downvote"){
          if(args.datatype == "board"){

          }
          if(args.datatype == "post"){

          }
          if(args.datatype == "comment"){

          }
        }

        if(args.action == "tags"){

        }

        if(args.action == "report"){
          if(args.datatype == "board"){
            console.log("[REPORT] board",args.id)
          }
          if(args.datatype == "post"){
            console.log("[REPORT] post",args.id)
          }
          if(args.datatype == "comment"){
            console.log("[REPORT] comment",args.id)
          }
        }

        if(args.action == "create"){
          if(args.datatype == "forum"){
            setDataTypeModal('forum');
            setDataModeModal('create');
            setIsOpenModal(true);
          }
          if(args.datatype == "board"){
            setDataTypeModal('board');
            setDataModeModal('create');
            setIsOpenModal(true);
          }

          if(args.datatype == "post"){
            setDataTypeModal('post');
            setDataModeModal('create');
            setIsOpenModal(true);
          }

          if(args.datatype == "comment"){
            setDataTypeModal('comment');
            setDataModeModal('create');
            setIsOpenModal(true);
          }
        }

        if(args.action == "APICREATE"){
          if(args.datatype == "forum"){
            console.log("CREATE API???")
            forums.push(args.doc);
            setForums([]);
            setForums(forums);
            setDataTypeModal(null);
            setDataModeModal(null);
            setMessageModal('CREATE FORUM');
            setIsOpenModal(true);
          }
          if(args.datatype == "board"){
            boards.push(args.doc);
            setBoards(boards);
            setDataModeModal(null);
            setDataTypeModal(null);
            setMessageModal('CREATE BOARD');
            setIsOpenModal(true);
          }
          if(args.datatype == "post"){
            posts.push(args.doc);
            setPosts(posts);
            setDataModeModal(null);
            setDataTypeModal(null);
            setMessageModal('CREATE POST');
            setIsOpenModal(true);
          }

          if(args.datatype == "comment"){
            comments.push(args.doc);
            setComments(comments);
            setDataModeModal(null);
            setDataTypeModal(null);
            setMessageModal('CREATE COMMENT');
            setIsOpenModal(true);
          }
        }

        if(args.action == "edit"){
          if(args.datatype == "forum"){
            setDataTypeModal('forum');
            setDataModeModal('edit');
            setIsOpenModal(true);
          }
          if(args.datatype == "board"){
            setDataTypeModal('board');
            setDataModeModal('edit');
            setEditID(args.id)
            setIsOpenModal(true);
          }
          if(args.datatype == "post"){
            setDataTypeModal('post');
            setDataModeModal('edit');
            setEditID(args.id)
            setIsOpenModal(true);
          }
          if(args.datatype == "comment"){
            setDataTypeModal('comment');
            setDataModeModal('edit');
            setEditID(args.id)
            setIsOpenModal(true);
          }
        }

        if(args.action == "delete"){
          if(args.datatype == "forum"){
            setDataTypeModal('forum');
            setDataModeModal('delete');
            setIsOpenModal(true);
          }

          if(args.datatype == "board"){
            setBoardID(args.id)
            setDataTypeModal('board');
            setDataModeModal('delete');
            setIsOpenModal(true);
          }

          if(args.datatype == "post"){
            setPostID(args.id)
            setDataTypeModal('post');
            setDataModeModal('delete');
            setIsOpenModal(true);
          }

          if(args.datatype == "comment"){
            setCommentID(args.id)
            setDataTypeModal('comment');
            setDataModeModal('delete');
            setIsOpenModal(true);
          }
        }

        if(args.action == "update"){
          if(args.datatype == "forum"){
            console.log("UPDATE???");
            console.log(forums);
            for(let i=0; i < forums.length;i++){
              console.log(forums[i]);
              if(forums[i].id  == args.id){
                forums[i].subject = args.subject;
                forums[i].content = args.content;
                setForums(forums);
                setDataTypeModal('message');
                setDataModeModal('message');
                setMessageModal("Forum Data Update!");
                setIsOpenModal(true);
                console.log("UPDATE DATA???");
                break;
              }
            }
          }
          if(args.datatype == "board"){
            for(let i=0; i < boards.length;i++){
              console.log(boards[i]);
              if(boards[i].id  == args.id){
                boards[i].subject = args.subject;
                boards[i].content = args.content;
                setBoards(boards);
                setDataTypeModal('message');
                setDataModeModal('message');
                setMessageModal("Board Data Update!");
                setIsOpenModal(true);
                console.log("UPDATE DATA???");
                break;
              }
            }
          }
          if(args.datatype == "post"){
            for(let i=0; i < posts.length;i++){
              console.log(posts[i]);
              if(posts[i].id  == args.id){
                posts[i].subject = args.subject;
                posts[i].content = args.content;
                setPosts(posts);
                setDataTypeModal('message');
                setDataModeModal('message');
                setMessageModal("Post Data Update!");
                setIsOpenModal(true);
                //console.log("UPDATE DATA???");
                break;
              }
            }
          }
          if(args.datatype == "comment"){
            for(let i=0; i < comments.length;i++){
              console.log(comments[i]);
              if(comments[i].id  == args.id){
                comments[i].subject = args.subject;
                comments[i].content = args.content;
                setComments(comments);
                setDataTypeModal('message');
                setDataModeModal('message');
                setMessageModal("Comment Data Update!");
                setIsOpenModal(true);
                //console.log("UPDATE DATA???");
                break;
              }
            }
          }
        }

        if(args.action == "APIDELETE"){
          if(args.datatype == "forum"){
            console.log("delete... API FORUM");
            for(let i =0; i< forums.length;i++){
              if(forums[i].id == args.id){
                forums.splice(i,1);
                break;
              }
            }
            setForums([]);
            setForums(forums);

            setDataTypeModal('DELETE');
            setDataModeModal('FORUM');
            setBoards([]);
            setPosts([]);
            setComments([]);
            setIsOpenModal(true);
          }
          if(args.datatype == "board"){
            setPostID(args.id);
            for(let i=0;i < boards.length;i++){
              //console.log(_comment);
              if(boards[i].id  == args.id){
                boards.splice(i,1)
                break;
              }
            }
            setBoards([]);
            setBoards(boards);
            setDataTypeModal('DELETE');
            setDataModeModal('BOARD');
            setIsOpenModal(true);
          }
  
          if(args.datatype == "post"){
            setPostID(args.id);
            for(let i=0;i < posts.length;i++){
              //console.log(_comment);
              if(posts[i].id  == args.id){
                posts.splice(i,1)
                break;
              }
            }
            setPosts(posts);
            setDataTypeModal('DELETE');
            setDataModeModal('POST');
            setIsOpenModal(true);
          }
  
          if(args.datatype == "comment"){
            setCommentID(args.id);
            for(let i=0;i < comments.length;i++){
              //console.log(_comment);
              if(comments[i].id  == args.id){
                comments.splice(i,1)
                break;
              }
            }
            setComments(comments);
            setDataTypeModal('DELETE');
            setDataModeModal('COMMENT');
            setIsOpenModal(true);
          }
        }
        
        //end action section
      }
    }
  }

  function renderComments(){
    if(isComment){
      return( <CommentSection comments={comments} postid={postID} ops={callBackOPS} />);
    }else{
      return( <label> Comment Empty! </label> );
    }
  }

  function checkRenderForumIndex(){
    //console.log("forumID: ",forumID);
    //console.log(typeof forumID);
    if(forumID !== "DEFAULT" && forumID != null){
      return (<a href="#" onClick={()=>callBackOPS({action:"selectindex"})}>Index</a>);
    }
    return (<> </>);
  } 

  function closeModel(){
    setIsOpenModal(false);
  }
  function toggleModal(){
    setIsOpenModal(!isOpenModal)
  }

  function renderDataTypeModal(){
    if(dataTypeModal == "forum"){
      if(dataModeModal == "create"){
        return <NewForum ops={callBackOPS}></NewForum>
      }
      if(dataModeModal == "edit"){
        let forum;
        for(let _forum of forums){
          console.log(_forum);
          if(_forum.id  == forumID){
            forum=_forum;
            break;
          }
        }
        return <EditForum forum={forum} ops={callBackOPS}></EditForum>
      }
      if(dataModeModal == "delete"){
        let forum;
        for(const _forum of forums){
          if(_forum.id == forumID){
            forum =_forum; 
            break;
          }
        }

        return <DeleteForum forum={forum} ops={callBackOPS}></DeleteForum>
      }
    }

    if(dataTypeModal == "board"){
      if(dataModeModal == "create"){
        return <NewBoard forumid={forumID} ops={callBackOPS}></NewBoard>
      }
      if(dataModeModal == "edit"){
        let board;
        for(let _board of boards){
          console.log(_board);
          if(_board.id  == editID){
            board=_board;
            break;
          }
        }
        return <EditBoard board={board} ops={callBackOPS}></EditBoard>
      }
      if(dataModeModal == "delete"){
        let board;
        for(const _board of boards){
          if(_board.id == boardID){
            board =_board; 
            break;
          }
        }
        return (<DeleteBoard board={board}  ops={callBackOPS} ></DeleteBoard>)
      }
    }

    if(dataTypeModal == "post"){
      if(dataModeModal == "create"){
        return <NewPost boardid={boardID} ops={callBackOPS}></NewPost>
      }
      if(dataModeModal == "edit"){
        let post;
        for(let _post of posts){
          console.log(_post);
          if(_post.id  == editID){
            post=_post;
            break;
          }
        }
        return <EditPost post={post} ops={callBackOPS}></EditPost>
      }
      if(dataModeModal == "delete"){
        let post;
        for(const _post of posts){
          if(_post.id == postID){
            post =_post; 
            break;
          }
        }
        return (<DeletePost post={post} ops={callBackOPS} ></DeletePost>)
      }
    }

    if(dataTypeModal == "comment"){
      //console.log("COMMENT......>>>>>>>>>>>>>>>>")
      if(dataModeModal == "create"){
        return <NewComment postid={postID} ops={callBackOPS}></NewComment>
      }
      if(dataModeModal == "edit"){
        let comment;
        for(let _comment of comments){
          //console.log(_comment);
          if(_comment.id  == editID){
            comment=_comment;
            break;
          }
        }
        return <EditComment comment={comment} ops={callBackOPS}></EditComment>
      }
      if(dataModeModal == "delete"){
        let comment;
        for(const _comment of comments){
          if(_comment.id == commentID){
            comment =_comment; 
            break;
          }
        }
        return (<DeleteComment comment={comment}  ops={callBackOPS} ></DeleteComment>)
      }
    }

    if(dataTypeModal == 'DELETE'){
      if(dataModeModal == 'FORUM'){
        return <p>ID [ {forumID} ] is Delete {dataModeModal}! </p>
      }
      if(dataModeModal == 'BOARD'){
        return <p>ID [ {boardID} ] is Delete {dataModeModal}! </p>
      }
      if(dataModeModal == 'POST'){
        return <p>ID [ {postID} ] is Delete {dataModeModal}! </p>
      }
      if(dataModeModal == 'COMMENT'){
        return <p>ID [ {commentID} ] is Delete {dataModeModal}! </p>
      }
    }
    return <p>{messageModal}</p>
  }

  return(<>
    <div>
      <ForumNavBar 
        forumID={forumID} 
        forums={forums}
        onChangeForum={onChangeForum}
        ops={callBackOPS}
      />

      {checkRenderForumIndex()}

      {renderBoards()}
      {renderPosts()}
      {renderComments()}
      <Modal isOpen={isOpenModal} closeModal={closeModel}>
        {renderDataTypeModal()}
      </Modal>
    </div>
  </>)
}
