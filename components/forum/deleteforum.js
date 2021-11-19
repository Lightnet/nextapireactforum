/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../lib/helper';
import useFetch from '../hook/usefetch';
  
export default function DeleteForum({forum,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(forum){
      setSubject(forum.subject)
      setContent(forum.content)
    }
  },[forum]);
  
  async function PostAPI(e){
    e.preventDefault();
    //console.log("delete forum");
    //console.log(subject);
    //console.log(content);
    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }
    
    let data = await useFetch('api/forum', {
      method:'DELETE',
      body:JSON.stringify({
        forumid:forum.id
      })
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH DELETE FOURM");
      return;
    }
    if(data.action == 'DELETE'){
      ops({
        action:'APIDELETE',
        datatype:'forum',
        id:data.id,
      })
    }
  }

  function onTypeSubject(e){
    setSubject(e.target.value);
  }
  function onTypeContent(e){
    setContent(e.target.value);
  }

  return(<>
    <div>
      <div>
        <label>Forum Name:</label>
        <br />
        <input value={subject} onChange={onTypeSubject} ></input>
      </div>

      <div>
        <label>Forum Content:</label>
        <br />
        <textarea value={content} onChange={onTypeContent}>

        </textarea>
      </div>
      <div>
        <button onClick={PostAPI}>Delete Confirm?</button>
      </div>
    </div>
  </>)
}