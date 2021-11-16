/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function EditPost({post,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(post){
      setSubject(post.subject);
      setContent(post.content);
    }
  },[post]);
  
  async function PostAPI(){
    console.log("post boardid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/post', {
      method:'POST',
      body:JSON.stringify({
        postid:post.id
        , action:'UPDATE'
        , subject:subject
        , content:content
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.action=='UPDATE'){
      ops({
        action:'update',
        datatype:'post',
        id:data.post.id,
        subject:data.post.subject,
        content:data.post.content,
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
      <div >
        <label>Edit Post Name:</label>
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