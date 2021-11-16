/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function component({boardid,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  //useEffect(()=>{
  //},[]);
  
  async function PostAPI(){
    console.log("postid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/post', {
      method:'POST',
      body:JSON.stringify({
        boardid:boardid
        , action:'CREATE'
        , subject:subject
        , content:content
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.action){
      if(data.action=='CREATE'){
        ops({
          action:'APICREATE'
          , datatype:'post'
          , doc:data.doc
        })
      }
    }
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
        <label>[Post] Subject:</label>
        <br />
        <input value={subject} onChange={onTypingSubject} />
      </div>
      <div>
        <label>Content</label>
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