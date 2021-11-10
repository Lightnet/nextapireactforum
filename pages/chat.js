/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/57323350/how-to-implement-react-hook-socketio-in-next-js
// https://blog.saeloun.com/2021/06/11/react-17-runs-useeffect-cleanup-asynchronously

import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
import io from "socket.io-client";
import { useState, useEffect } from "react";

function Page() {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setConnected] = useState(false);

  ///one time event ini mount
  useEffect(()=>{
    // here is componentDidMount
    console.log("[[=== test mount ===]]");
    return function cleanup() {
      console.log("[[=== test unmount ===]]");
    }
  },[]);

  useEffect(()=>{
    console.log("[[=== mount ===]]");
    if(socket){//check if socket is added to var to setup this up
      socket.on("connect", () => {
        console.log("SOCKET CONNECTED!", socket.id);
        setConnected(true);
      });
      socket.on("chatmessage", (msg) => {
        console.log("MSG: ", msg);
      }); 
    }
    return function cleanup() {
      console.log("[[=== unmount socket ===]]");
      if(socket) socket.disconnect();
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
    // log socket connection
    //_socket.on("connect", () => {
      //console.log("SOCKET CONNECTED!", _socket.id);
      //setConnected(true);
    //});
    //_socket.on("chatmessage", (msg) => {
      //console.log("MSG: ", msg);
    //});
    // update chat on new message dispatched
    //_socket.on("message", (message) => {
    //});
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
    <input value={message} onChange={inputChat} onKeyUp={inputEnterChat}></input><button onClick={onClickChat}>Chat</button>
  </AuthAccess>)
}
export default Page