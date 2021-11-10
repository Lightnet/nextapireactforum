/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import MessageCard from "./messagecard";

export default function component({messages}){

  const [msgs, setMessages]=useState([])

  return(<>
    <div>Messages</div>
    <div>
      {messages && messages.map((item)=>{
        return <MessageCard item={item}></MessageCard>
      })}
    </div>
  </>)
}