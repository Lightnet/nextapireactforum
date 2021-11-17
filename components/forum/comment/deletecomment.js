/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function DeleteComment({comment,ops}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(comment){
      setSubject(comment.subject);
      setContent(comment.content);
    }
    return ()=>{
      console.log("clean up???")
      setSubject(null);
      setContent(null);
    }
  },[comment]);
  
  async function PostAPI(){
    console.log("commentid");

    if(isEmpty(subject) || isEmpty(content)){
      console.log("EMPTY!");
      return;
    }

    let data = await useFetch('api/comment', {
      method:'POST',
      body:JSON.stringify({
        commentid:comment.id
        , action:'DELETE'
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR GET BOARDS");
      return;
    }
    if(data.action=='DELETE'){
      ops({
        action:'APIDELETE',
        datatype:'comment',
        id:data.id,
      });
    }
  }

  return(<>
    <div>
      <div>
        <label>Comment ID:{comment?.id}</label>
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