// https://www.youtube.com/watch?v=Hixx31BX5kY


import { useState, useEffect } from 'react';

export default function component({boards}){

  const [currentBaords, setBaords] = useState([])

  useEffect(()=>{
    console.log("UPDATE BOARD...]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
    //setPosts(posts);
  },[boards]);

  function renderPosts(){
    if(currentPosts){
      return currentPosts.map(item=>{
        return divPost(item);
      })
    }else{
      return <div>None</div>
    }
  }

  function btnCreateBoard(){

  }

  function btnDeleteBoard(){

  }

  return(<>
    <div>
      <label>Boards</label>
      <button onClick={btnCreateBoard}> Create Baord </button>  
      <button onClick={btnDeleteBoard}> Create Baord </button>  
      <div>board list:</div>
    </div>
  </>)
}

/**
 {renderPosts()}
 {boards.map(item0=>{return renderBoards(item0)})}
 */