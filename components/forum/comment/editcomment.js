/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function EditComment({comment,ops}){
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(comment){
      setContent(comment.content);
    }
  },[comment]);
  
  async function PostAPI(){
    console.log("comment postid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let data = await useFetch('api/comment', {
      method:'PATCH',
      body:JSON.stringify({
        commentid:comment.id
        , content:content
      })
    });
    if(data.error){
      console.log("ERROR FETCH UPDATE COMMENT");
      return;
    }
    console.log(data);
    if(data.action=='UPDATE'){
      ops({
        action:'update',
        datatype:'comment',
        id:data.comment.id,
        content:data.comment.content,
      });
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