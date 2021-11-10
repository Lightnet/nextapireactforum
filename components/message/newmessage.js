/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../lib/helper';
  
export default function component(){

  const [sentID, setSentID] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  //useEffect(()=>{
  //},[]);
  
  async function PostAPI(){
    console.log("post Message");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/message', {
      method:'POST',
      body:JSON.stringify({
        sentID:sentID
        , action:'createmessage'
        , subject:subject
        , content:content
      })
    });

    let data = await rep.json();
    console.log(data);
  }

  function onTypingID(e){
    setSentID(e.target.value);
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
        <label> ID </label><input value={sentID} onChange={onTypingID} />
      </div>  
      <div>
        <label>Subject:</label>
        <br />
        <input value={subject} onChange={onTypingSubject} />
      </div>
      <div>
        <label>Message:</label>
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
/*
 
*/