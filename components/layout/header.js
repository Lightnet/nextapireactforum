/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import Sign from "../system/sign";
import Link from 'next/link';
import ThemeLink from "../theme/themelink";

function Page() {

  const { data: session, status } = useSession();

  useEffect(() => {
    //console.log("status:", status);
  },[]);

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
        <Link  href="/chat">Chat</Link >{/*
        <span> | </span>
        <Link  href="/adventureguild">Adventure Guild</Link >*/}
        <span> | </span>
        <ThemeLink />
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