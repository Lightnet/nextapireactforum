/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import NewBoard from "./newboard";
import BoardCard from "./boardcard";

export default function component({boards,forumid,ops}){

  const [currentBaords, setBaords] = useState([])
  const [isOpenBoard, setIsOpenBoard] = useState(false)

  useEffect(()=>{
    console.log("[[[=== UPDATE BOARD ===]]]");
    setBaords(boards)
  },[boards]);

  function renderBoards(){
    if(currentBaords){
      return currentBaords.map(item=>{
        return <BoardCard key={item.id} item={item} ops={ops}/>
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
/*

*/