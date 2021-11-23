/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../../lib/helper';
import useFetch from '../../hook/usefetch';
  
export default function DeleteComment({comment,ops}){
  const [content,setContent] = useState("");

  useEffect(()=>{
    if(comment){
      setContent(comment.content);
    }
    return ()=>{
      console.log("clean up???")
      setContent(null);
    }
  },[comment]);
  
  async function PostAPI(){
    console.log("commentid");

    let data = await useFetch('api/comment', {
      method:'DELETE',
      body:JSON.stringify({
        commentid:comment.id
      })
    });
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH DELETE COMMENT");
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