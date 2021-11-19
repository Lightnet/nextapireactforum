/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
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
    //console.log("postid");
    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let data = await useFetch('api/post', {
      method:'PATCH',
      body:JSON.stringify({
        postid:post.id
        , subject:subject
        , content:content
      })
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH EDIT POST");
      return;
    }
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