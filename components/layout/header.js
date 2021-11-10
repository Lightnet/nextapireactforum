/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import BtnSign from "../system/btnsign";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  function changeLight(){
    document.documentElement.setAttribute('data-theme', 'light');
  }

  function changeDark(){
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <div style={{width:"100%",height:"32px",backgroundColor:'#808080'}}>
        <a href="/">Home</a>
        <span> | </span>
        <a href="/forum">Forum</a>
        <span> | </span>
        <a href="/adventureguild">Adventure Guild</a>
        <span> | </span>
        <label>Signed in as {session.user.name}</label>
        <span> | </span>
        <BtnSign></BtnSign>

        
        <span> | </span>
        <a href="#" onClick={changeLight}>Light</a>
        <span> | </span>
        <a href="#"  onClick={changeDark}>Dark</a>
        </div>
    </>)
  }

  return (<>
    <SignArea></SignArea>
  </>)
}
export default Page