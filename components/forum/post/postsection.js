// https://www.youtube.com/watch?v=Hixx31BX5kY


import { useState, useEffect } from 'react';

function divPost(item){
  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div>{item.subject}</div>
      <div>{item.content}</div>
      <div>
      <a href="#"> Up Vote </a>
      <span> | </span>
      <a href="#"> Down Vote </a>
      <span> | </span>
      <a href="#"> Comment </a>
      <span> | </span>
      <a href="#"> Tags </a>
      <span> | </span>
      <a href="#"> Report </a>
      </div>
    </div>
  )
}

export default function component({posts}){

  const [currentPosts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  useEffect(()=>{
    console.log("UPDATE POST...]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
    //setPosts(posts);
    console.log(posts)
    if(posts){//check if has var
      setPosts(posts);
    }

  },[posts]);

  function renderPosts(){
    if(currentPosts){
      return currentPosts.map(item=>{
        return divPost(item);
      })
    }else{
      return <div>None</div>
    }
  }

  return(<>
    <div>
      <label>post</label>
      {renderPosts()}
    </div>
  </>)
}

/**
 {boards.map(item0=>{return renderBoards(item0)})}
 */