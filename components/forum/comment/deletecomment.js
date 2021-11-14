/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
  
export default function DeleteComment({comment,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(comment){
      setSubject(comment.subject);
      setContent(comment.content);
    }
  },[comment]);
  
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
        , action:'DELETE'
      })
    });

    let data = await rep.json();
    console.log(data);
    if(data.action=='DELETE'){
      ops({
        action:'UPDATEDELETE',
        datatype:'comment',
        id:data.id,
      });
    }
  }

  return(<>
    <div>
      <div>
        <label>ID:{comment.id}</label>
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
/*
 
*/