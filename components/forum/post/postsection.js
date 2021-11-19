/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import PostCard from "./postcard";

export default function component({posts,boardid,ops}){

  const [currentPosts, setPosts] = useState([])

  useEffect(()=>{
    //console.log("[[[=== UPDATE POST ===]]]");
    //console.log(posts)
    if(posts){//check if has var
      setPosts(posts);
    }
  },[posts]);

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
      <button onClick={()=>ops({action:'create',datatype:'post',id:boardid})}> New Post </button>
      {renderPosts()}
    </div>
  </>)
}
/*
 
*/