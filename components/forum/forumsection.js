// https://www.youtube.com/watch?v=Hixx31BX5kY


import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";

export default function component(){

  const [boards, setBoards] = useState([])

  useEffect(()=>{
    setBoards([]);
    console.log("init setup");
  },[]);

  return(<>
    <div>
      <label>Forum</label>
      <BoardSection>
        
      </BoardSection>
    </div>
  </>)
}
/*
{boards.map(item0=>{return renderBoards(item0)})}

*/
