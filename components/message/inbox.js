/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import useFetch from '../hook/usefetch';
import MessageCard from "./messagecard";

export default function component({}){

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    getMessages();
  },[])

  async function deleteMessage(id){
    let data = await useFetch('api/message',{
      method:'DELETE',
      body:JSON.stringify({id:id})
    });
    console.log("MESSSAGE DATA");
    console.log(data);
    if(data.error){
      console.log("ERROR MESSAGE FETCH");
      return;
    }
    if(data.action){
      if(data.action=='DELETE'){
        //setMessages(data.messages);
        setMessages(messages.filter(item=>item.id !== data.id));
      }
    }
  }

  function callBackOPS(args){
    if(args){
      if(args.action){
        if(args.action='delete'){
          deleteMessage(args.id);
        }
      }
    }
  }

  async function getMessages(){
    let data = await useFetch('api/message',{method:'GET'});
    console.log("MESSSAGE DATA");
    console.log(data);
    if(data.error){
      console.log("ERROR MESSAGE FETCH");
      return;
    }
    if(data.action){
      if(data.action=='MESSAGES'){
        setMessages(data.messages);
      }
    }
  }

  return(<>
    <div>Messages</div>
    <div>
      {messages.map((item)=>{
        return <MessageCard key={item.id} item={item} ops={callBackOPS}></MessageCard>
      })}
    </div>
  </>)
}