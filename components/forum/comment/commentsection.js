/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import CommentCard from "./commentcard";

export default function component({comments,postid,ops}){

  const [currentComments, setComments] = useState([])

  useEffect(()=>{
    console.log("[[[=== UPDATE POST ===]]]");
    //setPosts(posts);
    console.log(comments)
    if(comments){//check if has var
      setComments(comments);
    }
  },[comments]);

  function renderComments(){
    if(currentComments){
      return currentComments.map(item=>{
        return <CommentCard key={item.id} item={item} ops={ops}></CommentCard>;
      })
    }else{
      return <div>None</div>
    }
  }

  return(<>
    <div>
      <label>Comment </label>
      <button onClick={()=>ops({action:'create',datatype:'comment',id:postid})}> New Comment </button>
      {renderComments()}
    </div>
  </>)
}