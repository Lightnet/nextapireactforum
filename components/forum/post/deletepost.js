/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function DeletePost({post,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(post){
      setSubject(post.subject);
      setContent(post.content);
    }
  },[post]);
  
  async function PostAPI(){
    console.log("postid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let rep = await fetch('api/post', {
      method:'POST',
      body:JSON.stringify({
        postid:post.id
        , action:'DELETE'
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.action=='DELETE'){
      ops({
        action:'UPDATEDELETE',
        datatype:'post',
        id:data.id,
      });
    }
  }

  return(<>
    <div>
      <div>
        <label>Post ID:{post?.id}</label>
        <br />
        <label>Subject:</label>
        <br />
        <label>{subject}</label>
      </div>
      <div>
        <label>Content</label>
        <br />
        <label>
          {content}
        </label>
      </div>
      <div>
        <button onClick={PostAPI}>Delete Confirm?</button>
      </div>
    </div>
  </>)
}