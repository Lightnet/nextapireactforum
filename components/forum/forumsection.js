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

import DeleteComment from './comment/deletecomment';
import DeletePost from './post/deletepost';
import DeleteBoard from './board/deleteboard';
import DeleteForum from './deleteforum';

import ForumNavBar from "./forumnavbar";
import Modal from '../ui/modal';
import useFetch from '../hook/usefetch';
import { isEmpty } from '../../lib/helper';

import { useForum } from './forumprovider';
import { Color, useNotifty } from '../notify/notifyprovider';

export default function component(){

  const {dispatchNotify} = useNotifty();

  const {
    forumID, setForumID,
    forums, setForums,
    boardID, setBoardID,
    boards, setBoards,
    postID,setPostID,
    posts, setPosts,
    commentID,setCommentID,
    comments, setComments
  } = useForum();

  //forum
  //const [forums, setForums] = useState([]);
  //const [forumID, setForumID] = useState('');
  
  //board
  //const [boards, setBoards] = useState([]);
  //const [boardID, setBoardID] = useState("");
  const [isBoard, setIsBoard] = useState(false);  
  //post 
  const [isPost, setIsPost] = useState(false); 
  //const [posts, setPosts] = useState([]); 
  //const [postID, setPostID] = useState(null); 
  //comment
  const [isComment, setIsComment] = useState(false); 
  //const [comments, setComments] = useState([]);
  //const [commentID, setCommentID] = useState(null);

  //modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataTypeModal, setDataTypeModal] = useState(null); // forum, board, post, commment
  const [dataModeModal, setDataModeModal] = useState(null); // edit, delete, move?
  const [editID, setEditID] = useState(null);

  const [messageModal, setMessageModal] = useState("None Message!"); // edit, delete, move?

  //once init forum
  useEffect(()=>{
    //console.log("init setup");
    getForums();
  },[]);

  // need to fixed this later 
  // need to check the select type
  useEffect(()=>{
    if(isBoard){
      getBoards();
    }
    if(isPost){
      getPosts();
    }
    if(isComment){
      getComments();
    }
    return () =>{
      console.log('CLEAN UP FORUM..........................')
    }
  },[forumID,isBoard,isPost,isComment]);

  useEffect(()=>{
    console.log("forumID USEEFFECT", forumID)
    if(!isEmpty(forumID)){
      getBoards();
    }
  },[forumID]);

  function onChangeForum(e){
    console.log("onChangeForum>>>>>>>>>>>>");
    console.log(e.target.value);
    //console.log("forumID");
    setForumID(e.target.value);
    setBoards([]); //clear board
    setPosts([]) //clear posts
    setComments([]) //clear comments
    setIsBoard(true);
  }

  function createSuccess(message){
    dispatchNotify({
      type: 'add'
      , color: Color.success
      , children: message
    })
  }

  function createInfo(message){
    dispatchNotify({
      type: 'add'
      , color: Color.info
      , children: message
    })
  }

  async function getForums(){
    let data = await useFetch('api/forum');
    //console.log(data);
    if(data.error){
      console.log("ERROR GET FORUM ");
      return;
    }
    if(data.action == "forums"){
      if(data.forums){
        setBoards([]); //clear board
        setPosts([]) //clear posts
        setComments([]) //clear comments
        setForums(data.forums);
      }
    }
  }

  async function getBoards(){
    //console.log("forumID: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", forumID);
    let data = await useFetch('api/board',{
      method:'POST'
      , body: JSON.stringify({forumid:forumID,action:'BOARDS'})
    });
    if(data.error){
      console.log("ERROR GET BOARDS");
      return;
    }
    //console.log(data);
    if(data.action=="NOBOARD"){
      //console.log("NO BOARDS")
      createInfo('No boards')
      return;
    }
    if(data.action=="BOARDS"){
      console.log("BOARDS")
      setBoards(data.boards);
    }
  }

  async function getPosts(){
    console.log("[[[=== LOAD POSTS ===]]] BoardID: ",boardID);
    let data = await useFetch('api/post',{
      method:'POST'
      , body: JSON.stringify({boardid:boardID,action:'POSTS'})
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR GET POSTS");
      return;
    }
    if(data.action=="NOPOST"){
      console.log("NO POST")
      return;
    }
    if(data.action=="POSTS"){
      console.log("POSTS")
      console.log(data.posts)
      setPosts(data.posts);
    }
  }

  async function getComments(){
    //console.log("[[[=== LOAD COMMENTS ===]]]");
    //console.log("[[[ === POST ID == ]]]", postID)

    let data = await useFetch('api/comment',{
      method:'POST'
      , body: JSON.stringify({postid:postID,action:'COMMENTS'})
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR GET COMMENTS");
      return;
    }
    if(data.action=="NOCOMMENT"){
      console.log("NO COMMENT")
      return;
    }
    if(data.action=="COMMENTS"){
      console.log("COMMENTS")
      setComments(data.comments);
    }
  }

  function checkRenderForumIndex(){
    //console.log("forumID: ",forumID);
    //console.log(typeof forumID);
    if(forumID !== "" && forumID != null){
      return (<a href="#" onClick={()=>callBackOPS({action:"selectindex"})}>Index</a>);
    }
    return (<> </>);
  }

  //need to fixed select board to post
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
      }
      return( <label> Post Empty! </label> );
    }
  }

  function renderComments(){
    if(isComment){
      return( <CommentSection comments={comments} postid={postID} ops={callBackOPS} />);
    }else{
      return( <label> Comment Empty! </label> );
    }
  }

  function callBackOPS(args){
    if(args){
      if(args.action){
        if(args.action == "selectindex"){
          setPosts([]) //clear posts
          setComments([]) //clear comments
          setIsBoard(true);
          setIsPost(false);
          setIsComment(false);
        }

        if(args.action == "selectboard"){
          console.log('TOP NAV SELECT BAORD??');
          console.log("boardID: ",boardID)
          //setBoards([]); //clear board
          //setPosts([]) //clear posts
          setComments([]) //clear comments
          //setBoardID(args.id);
          setIsBoard(false);
          setIsPost(true);
          setIsComment(false);
        }

        if(args.action == "selectpost"){
          //setPostID(args.id);
          setIsBoard(false);
          setIsPost(false);
          setIsComment(true);
        }

        if(args.action == "select"){
          if(args.datatype == "board"){
            console.log("CHILD SELECT BOARD");
            setPosts([])//clear posts
            setComments([])//clear comments
            setBoardID(args.id);
            setIsBoard(false);
            setIsPost(true);
            setIsComment(false);
          }
          if(args.datatype == "post"){
            setComments([])//clear comments
            setPostID(args.id);
            setIsBoard(false);
            setIsPost(false);
            setIsComment(true);
          }

          /*
          if(args.datatype == "comment"){
            setCommentID(args.id);
            setIsBoard(false);
            setIsPost(false);
            setIsComment(true);
          }
          */
        }

        if(args.action == "upvote"){
          if(args.datatype == "post"){

          }
          if(args.datatype == "comment"){

          }
        }

        if(args.action == "downvote"){
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
            console.log("CREATE Forum???")
            setForums([...forums,args.doc]);
            setIsOpenModal(false);
            createSuccess('Create Forum: ' + args.doc.subject)
          }
          if(args.datatype == "board"){
            setBoards([...boards,args.doc]);
            console.log(args.doc)
            setIsOpenModal(false);
            createSuccess('Create Board: ' + args.doc.subject)
          }
          if(args.datatype == "post"){
            setPosts([...posts,args.doc]);
            setIsOpenModal(false);
            createSuccess('Create Board: ' + args.doc.subject)
          }

          if(args.datatype == "comment"){
            setComments([...comments,args.doc]);
            setIsOpenModal(false);
            createSuccess('Create Comment ID: ' + args.doc.id)
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
            //console.log("UPDATE???");
            //console.log(forums);
            setForums(
              forums.map(item=>
                item.id === args.id
                ? {...item,subject:args.subject,content:args.content}
                : item
            ));
            setIsOpenModal(false);
            createSuccess('Update Forum ID: ' + args.id);
          }
          if(args.datatype == "board"){
            setBoards(boards.map(item=>
              item.id === args.id
              ? {...item,subject:args.subject,content:args.content}
              : item
            ));
            setIsOpenModal(false);
            createSuccess('Update Board ID: ' + args.id);
          }
          if(args.datatype == "post"){
            setPosts(posts.map(item=>
              item.id === args.id
              ? {...item,subject:args.subject,content:args.content}
              : item
            ));
            setIsOpenModal(false);
            createSuccess('Update POST ID: ' + args.id);
          }
          if(args.datatype == "comment"){
            setComments(comments.map(item=>
              item.id === args.id
              ? {...item,subject:args.subject,content:args.content}
              : item
            ));
            setIsOpenModal(false);
            createSuccess('Update COMMENT ID: ' + args.id);
          }
        }

        if(args.action == "APIDELETE"){
          if(args.datatype == "forum"){
            console.log("delete... API FORUM");
            setForums(forums.filter(item=>item.id !== args.id ));
            setBoards([]);
            setPosts([]);
            setComments([]);
            setIsOpenModal(false);
            createSuccess('Delete Forum: ' + args.id)
          }
          if(args.datatype == "board"){
            setPostID(args.id);
            setBoards(boards.filter(item=>item.id !== args.id ));
            setIsOpenModal(false);
            createSuccess('Delete Board: ' + args.id)
          }
          if(args.datatype == "post"){
            setPostID(args.id);
            setPosts(posts.filter(item=>item.id !== args.id ));
            setIsOpenModal(false);
            createSuccess('Delete Post: ' + args.id)
          }
          if(args.datatype == "comment"){
            setCommentID(args.id);
            setComments(comments.filter(item=>item.id !== args.id ));
            setIsOpenModal(false);
            createSuccess('Delete Comment: ' + args.id)
          }
        }
        //end action section
      }
    }
  }

  function closeModel(){
    setIsOpenModal(false);
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
      {isOpenModal &&
      <Modal isOpen={isOpenModal} closeModal={closeModel}>
        {renderDataTypeModal()}
      </Modal>}
    </div>

  </>)
}
