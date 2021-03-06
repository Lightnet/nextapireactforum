/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function component({forumid,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  const [parentID, setParentID] = useState("");

  useEffect(()=>{
    if(forumid!=null){
      setParentID(forumid)
    }
  },[forumid,parentID]);
  
  
  async function PostAPI(){
    //console.log("BOARD forumid: ", forumid);
    //console.log(subject);
    //console.log(content);
    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }
    
    let data = await useFetch('api/board', {
      method:'POST',
      body:JSON.stringify({
        forumid:forumid
        , action:'CREATE'
        , subject:subject
        , content:content})
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH CREATE BOARD");
      return;
    }
    if(data.action){
      if(data.action){
        ops({
          action:'APICREATE'
          , datatype:'board'
          , doc: data.doc
        })
      }
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
        <label>Parent ID:</label>
        <br />

        {/*
        <input value={subject} onChange={onTypingSubject}></input>
        <select value={parentID} onChange={onSelectParentID}>
          <option value={forumid}> Index </option>
        </select>
        <input value={parentID} onChange={onTypingParentID} />
        */}
        <label> {parentID} </label>
        

        
      </div>

      <div>
        <label>Summary:</label>
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