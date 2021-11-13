/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function EditComment({comment,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  //const [postType,setPostType] = useState("post");

  useEffect(()=>{
    if(comment){
      setSubject(comment.subject);
      setContent(comment.content);
    }
  },[]);
  
  async function PostAPI(){
    console.log("comment postid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/comment', {
      method:'POST',
      body:JSON.stringify({
        commentid:comment.id
        , action:'UPDATE'
        , subject:subject
        , content:content
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.message=='UPDATE'){
      ops({
        action:'update',
        datatype:'comment',
        id:data.comment.id,
        subject:data.comment.subject,
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