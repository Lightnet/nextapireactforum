/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { useForum } from '../forumprovider';
import CommentCard from "./commentcard";

export default function component({comments,postid,ops}){

  const [currentComments, setComments] = useState([])
  const { posts } = useForum();
  const [ post, setPost ] = useState(null);

  useEffect(()=>{
    //console.log("[[[=== UPDATE POST ===]]]");
    console.log("posts")
    console.log(posts)
    if(posts){
      for(let post of posts){
        if(post.id == postid){
          console.log(post);
          setPost(post);
          break;
        }
      }
    }
    if(comments){//check if has var
      setComments(comments);
    }
    return ()=>{
      setComments(null);
      setPost(null);
    }
  },[comments,postid]);

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
      <label>Content:</label>
      {post?.content}
    </div>
    <div>
      <label>Comment </label>
      <button onClick={()=>ops({action:'create',datatype:'comment',id:postid})}> New Comment </button>
      {renderComments()}
    </div>
  </>)
}