/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react"
//import useFetch from "../hook/usefetch";
import Inbox from "./inbox";
import Settings from "./messagesettings";
import NewMessage from "./newmessage";

export default function component(){

  const [view, setView]=useState("inbox");

  //useEffect(()=>{
  //},[])

  function viewRender(){
    if(view=='inbox'){
      return <Inbox></Inbox>
    }else if(view=='newmessage'){
      return <NewMessage></NewMessage>
    }else if(view=='settings'){
      return <Settings></Settings>
    }
    return <></>
  }

  return(<>
    <div>
      <label> Message </label>
      <div> 
        <a href="#" onClick={()=>setView('inbox')}>Inbox</a>
        <span> | </span> 
        <a href="#" onClick={()=>setView('newmessage')}>New Message</a> 
        <span> | </span> 
        <a href="#" onClick={()=>setView('settings')}>Settings</a>
      </div>
      {viewRender()}
    </div>
  </>)
}