/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function component({postid,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{

  },[]);
  
  async function PostAPI(){
    console.log("comment postid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let data = await useFetch('api/comment', {
      method:'POST',
      body:JSON.stringify({
        postid:postid
        , action:'CREATE'
        , subject:subject
        , content:content
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR GET COMMENT");
      return;
    }
    if(data.action){
      if(data.action=='CREATE'){
        ops({
          action:'APICREATE'
          , datatype:'comment'
          , doc: data.doc
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
        <label>Comment Name:</label>
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