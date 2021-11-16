/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function DeleteBoard({board,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(board){
      setSubject(board.subject);
      setContent(board.content);
    }
  },[board]);
  
  async function PostAPI(){
    console.log("boardid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/board', {
      method:'POST',
      body:JSON.stringify({
        boardid:board.id
        , action:'DELETE'
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.action=='DELETE'){
      ops({
        action:'APIDELETE',
        datatype:'board',
        id:data.id,
      });
    }
  }

  return(<>
    <div>
      <div>
        <label>Board ID:{board?.id}</label>
        <br />
        <label>Subject:</label>
        <br />
        <label>{subject}</label>
      </div>
      <div>
        <label>Content</label>
        <br />
        <label>
          {content}
        </label>
      </div>
      <div>
        <button onClick={PostAPI}>Delete Confirm?</button>
      </div>
    </div>
  </>)
}
/*
 
*/