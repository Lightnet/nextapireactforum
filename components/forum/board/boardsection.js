/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import BoardCard from "./boardcard";

export default function BoardSection({boards,forumid,ops}){

  const [currentBaords, setBaords] = useState([]);

  useEffect(()=>{
    console.log("[[[=== UPDATE BOARD ===]]]");
    if(boards){
      setBaords(boards);
    }
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

  return(<>
    <div>
      <label>Boards </label>
      <button onClick={()=>ops({action:'create',datatype:'board',id:forumid})}> Create Baord </button>
      {renderBoards()}
    </div>
  </>)
}
/*

*/