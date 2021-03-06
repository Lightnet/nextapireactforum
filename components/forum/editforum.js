/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../lib/helper';
import useFetch from '../hook/usefetch';
  
export default function editForum({forum,forumid,ops}){
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
    console.log("update forum");
    console.log(subject);
    console.log(content);
    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }
    
    let data = await useFetch('api/forum', {
      method:'PATCH',
      body:JSON.stringify({
        forumid:forum.id ,
        subject:subject ,
        content:content
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH DELETE FOURM");
      return;
    }
    if(data.action == 'UPDATE'){
      ops({
        action:'update',
        datatype:'forum',
        id:data.forum.id,
        subject:data.forum.subject,
        content:data.forum.content
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
        <button onClick={PostAPI}>Update</button>
      </div>
    </div>
  </>)
}