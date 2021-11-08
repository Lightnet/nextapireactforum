/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import NewBoard from "./newboard";

function divBoard(item){
  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div> <a href="#">  {item.subject} </a> </div>
      <div>{item.content}</div>
    <div>
      <span> | </span>
      <a href="#"> Tags </a>  
      </div>
    </div>
  )
}

export default function component({boards,forumid}){

  const [currentBaords, setBaords] = useState([])
  const [isOpenBoard, setIsOpenBoard] = useState(false)

  useEffect(()=>{
    console.log("[[[=== UPDATE BOARD ===]]]");
    getBoards();
  },[forumid]);

  function getBoards(){
    console.log("UPDATE API BOARD???");
  }

  function renderBoards(){
    if(currentBaords){
      return currentBaords.map(item=>{
        return divBoard(item);
      })
    }else{
      return <div>None</div>
    }
  }

  function btnCreateBoard(){
    setIsOpenBoard(!isOpenBoard);
  }

  function btnDeleteBoard(){

  }

  return(<>
    <div>
      <label>Boards</label>
      <button onClick={btnCreateBoard}> Create Baord </button>  
      <button onClick={btnDeleteBoard}> Create Baord </button>  
      {isOpenBoard && <NewBoard forumid={forumid}></NewBoard>}
      {renderBoards()}
    </div>
  </>)
}

/**
 {renderPosts()}
 {boards.map(item0=>{return renderBoards(item0)})}
 */