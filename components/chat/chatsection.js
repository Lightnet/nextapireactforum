/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react"

export default function component(){

  const [view, setView]=useState("inbox");

  useEffect(()=>{
    getMessages();
  },[])


  async function getMessages(){
    let res = await fetch('api/message',{method:'GET'});
    let data = res.json();
    console.log("MESSSAGE DATA");
    console.log(data);
  }

  function viewRender(){
    return <></>
  }

  return(<>
    <div>
      <label> Chat </label>
      <div> 
        <a href="#" onClick={()=>setView('users')}>Users</a> 
        <span> | </span> 
        <a href="#" onClick={()=>setView('settings')}>Settings</a>
      </div>
      {viewRender()}
    </div>
  </>)
}