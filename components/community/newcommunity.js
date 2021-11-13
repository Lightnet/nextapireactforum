/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
  
export default function component(){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  const [postType,setPostType] = useState("post");
  
  async function PostAPI(){
    let rep = await fetch('api/community', {
      method:'POST',
      body:JSON.stringify({subject:'test community',content:'text community'})
    });
    let data = await rep.json();
    console.log(data);
  }

  useEffect(()=>{

  },[]);

  return(<>
    <div>
      <div>
        <label>Name</label>
        <input></input>
      </div>

      <div>
        <textarea>

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