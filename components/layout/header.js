/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import Sign from "../system/sign";
import Link from 'next/link';

function Page() {

  const { data: session, status } = useSession();

  useEffect(() => {
    //console.log("status:", status);
    //check for theme
    const theme = localStorage.getItem('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);
    }
  },[]);

  function changeLight(){
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  function changeDark(){
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <div className="headerpanel navblock" style={{width:"100%",height:"32px"}}>
        <label>Username: {session.user.name}</label>
        <span> | </span>
        <Link  href="/">Home</Link >
        <span> | </span>
        <Link  href="/forum">Forum</Link >
        <span> | </span>
        <Link  href="/message">Message</Link >
        <span> | </span>
        <Link  href="/chat">Chat</Link >
        <span> | </span>
        <Link  href="/adventureguild">Adventure Guild</Link >
        <span> | </span>
        <label> Theme </label>
        <span> | </span>
        <a  href="#" onClick={changeLight}>Light</a>
        <span> | </span>
        <a  href="#"  onClick={changeDark}>Dark</a>
        <span> | </span>
        <span style={{float:'right'}}> <Sign></Sign> </span>
        </div>
    </>)
  }

  return (<>
    <SignArea></SignArea>
  </>)
}
export default Page