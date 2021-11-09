/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import NewComment from "./newcomment";
import CommentCard from "./commentcard";

export default function component({comments,postid,selectComment}){

  const [currentComments, setComments] = useState([])
  const [isOpenComment, setIsOpenComment] = useState(false);

  useEffect(()=>{
    console.log("[[[=== UPDATE POST ===]]]");
    //setPosts(posts);
    console.log(comments)
    if(comments){//check if has var
      setComments(comments);
    }
  },[comments]);

  function btnCreateComment(){
    setIsOpenComment(!isOpenComment);
  }

  function renderComments(){
    if(currentComments){
      return currentComments.map(item=>{
        return <CommentCard key={item.id} item={item} commentPost={selectComment}></CommentCard>;
      })
    }else{
      return <div>None</div>
    }
  }

  return(<>
    <div>
      <label>Comment</label>
      <button  onClick={btnCreateComment}> New Comment </button>
      <button> Delete Post </button>
      {isOpenComment && <NewComment postid={postid}></NewComment>}

      {renderComments()}
    </div>
  </>)
}