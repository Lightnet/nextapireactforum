/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
  
export default function component({forumid}){
  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  const [postType,setPostType] = useState("post");
  
  
  async function PostAPI(){
    console.log("BOARD forumid");
    console.log(forumid);
    /*
    let rep = await fetch('api/board', {
      method:'POST',
      body:JSON.stringify({forumid:forumid,subject:'test board',content:'text'})
    });
    let data = await rep.json();
    console.log(data);
    */
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
        <label>Parent:</label>
        <input />

        <select>
          <option> Test </option>
        </select>
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

/**
 {boards.map(item0=>{return renderBoards(item0)})}
 */