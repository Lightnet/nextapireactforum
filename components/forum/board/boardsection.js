// https://www.youtube.com/watch?v=Hixx31BX5kY


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

export default function component({boards}){

  const [currentBaords, setBaords] = useState([])
  const [isOpenBoard, setIsOpenBoard] = useState(false)

  useEffect(()=>{
    console.log("UPDATE BOARD...]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
    //setPosts(posts);
    if(boards){
      setBaords(boards);
    }
  },[boards]);

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
    if(isOpenBoard){
      setIsOpenBoard(false);
    }else{
      setIsOpenBoard(true);
    }
  }

  function btnDeleteBoard(){

  }

  return(<>
    <div>
      <label>Boards</label>
      <button onClick={btnCreateBoard}> Create Baord </button>  
      <button onClick={btnDeleteBoard}> Create Baord </button>  
      {isOpenBoard && <NewBoard></NewBoard>}
      {renderBoards()}
    </div>
  </>)
}

/**
 {renderPosts()}
 {boards.map(item0=>{return renderBoards(item0)})}
 */