/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import PostCard from "./postcard";
import NewPost from "./newpost";

export default function component({posts,boardid,ops}){

  const [currentPosts, setPosts] = useState([])
  const [isOpenPost, setIsOpenPost] = useState(false);

  useEffect(()=>{
    console.log("[[[=== UPDATE POST ===]]]");
    //setPosts(posts);
    console.log(posts)
    if(posts){//check if has var
      setPosts(posts);
    }
  },[posts]);

  function btnCreatePost(){
    setIsOpenPost(!isOpenPost);
  }

  function renderPosts(){
    if(currentPosts){
      return currentPosts.map(item=>{
        return <PostCard key={item.id} item={item} ops={ops}></PostCard>;
      })
    }else{
      return <div>None</div>
    }
  }

  return(<>
    <div>
      <label> Post </label>
      <button onClick={btnCreatePost}> New Post </button>
      {isOpenPost && <NewPost boardid={boardid}></NewPost>}
      {renderPosts()}
    </div>
  </>)
}
/*
 
*/