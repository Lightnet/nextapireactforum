/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/57323350/how-to-implement-react-hook-socketio-in-next-js
// https://blog.saeloun.com/2021/06/11/react-17-runs-useeffect-cleanup-asynchronously
// https://stackoverflow.com/questions/35153599/reactjs-get-height-of-an-element
// https://www.codegrepper.com/code-examples/javascript/chat+scroll+to+bottom+react

import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";

function Page() {
  //const ref =useRef();
  const messagesEndRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setConnected] = useState(false);
  //const [messagesId, setmMssagesId] = useState('randchatid');

  ///one time event ini mount
  useEffect(()=>{
    // here is componentDidMount
    console.log("[[=== test mount ===]]");
    return function cleanup() {
      console.log("[[=== test unmount ===]]");
    }
  },[]);

  const scrollToBottom = () => {
    if(messagesEndRef.current){//null first time need ref from component next update
      //console.log(messagesEndRef);
      //console.log(messagesEndRef.current);
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(()=>{
    scrollToBottom();
  },[chat]);

  useEffect(()=>{
    console.log("[[=== mount ===]]");
    if((socket!=null) &&(isConnected == false)){//check if socket is added to var to setup this up
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED!", socket.id);
        setConnected(true);
      });

      socket.on("chatmessage", (msg) => {
        console.log("MSG: ", msg);
        chat.push(msg);
        setChat([...chat]);
      }); 

    }
    return function cleanup() {
      console.log("[[=== unmount socket ===]]");
      if(socket) socket.disconnect();
      setConnected(false);
    }
  },[socket]);//need this socket to able to clean up when unmount else socket will have many socket not disconnect

  //one time event ini mount
  useEffect(async ()=>{ // async will not work when clean up
    //console.log("mount"); // here is componentDidMount
    await fetch('api/socketio');//init socket server check
    
    //const socketIo = io(url);
    // connect to socket server
    let _socket = io.connect(process.env.HOST, {
      path: "/api/socketio",
    });
    setSocket(_socket);
  },[]);

  function onClickChat(){
    console.log(message);
  }

  function inputChat(event){
    //console.log("typeing...");
    setMessage(event.target.value);
  }

  function inputEnterChat(event){
    //console.log("typeing...");
    //console.log(event.keyCode);
    if(event.keyCode == 13){
      if(socket){
        socket.emit('chatmessage',message);
      }
    }
  }

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <div>
      {height}<input value={message} onChange={inputChat} onKeyUp={inputEnterChat}></input><button onClick={onClickChat}>Chat</button>
    </div>
    <div style={{height:'calc(100% - 34px)', overflow: "scroll"}}>
      
      {chat.length ? (
        chat.map((chat, i) => (
          <div key={"msg_" + i}>
            {i}: {chat}
          </div>
        ))
      ):(
        <div>No Chat Messages</div>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  </AuthAccess>)
}
export default Page