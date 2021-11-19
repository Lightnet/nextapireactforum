/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function EditBoard({board,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  const [parentID, setParentID] = useState("");

  useEffect(()=>{
    if(board){
      setSubject(board.subject);
      setContent(board.content);
    }
  },[board]);
  
  async function PostAPI(){
    //console.log("EDIT BoardID");
    //console.log(subject);
    //console.log(content);
    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let data = await useFetch('api/board', {
      method:'PATCH',
      body:JSON.stringify({
        boardid:board.id
        , subject:subject
        , content:content})
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH EDIT BOARD");
      return;
    }
    if(data.action=='UPDATE'){
      ops({
        action:'update',
        datatype:'board',
        id:data.board.id,
        subject:data.board.subject,
        content:data.board.content,
      });
    }
    
  }

  function onTypingParentID(e){
    setParentID(e.target.value);
  }

  function onSelectParentID(e){
    setParentID(e.target.value);
  }

  function onTypingSubject(e){
    setSubject(e.target.value);
  }

  function onTypingContent(e){
    setContent(e.target.value);
  }
  
  return(<>
    <div>
      <div>
        <label>Name:</label>
        <br />
        <input value={subject} onChange={onTypingSubject}></input>
      </div>

      <div>
        <label>Parent:</label>
        <br />
        <input value={parentID} onChange={onTypingParentID} />

        <select value={parentID} onChange={onSelectParentID}>
          <option > Index </option>
        </select>
      </div>


      <div>
        <label>Summrty:</label>
        <br />
        <textarea value={content} onChange={onTypingContent}>

        </textarea>
      </div>
      <div>
        <button onClick={PostAPI}>Sumbit</button>
      </div>
    </div>
  </>)
}

/**
 {boards.map(item0=>{return renderBoards(item0)})}
 */