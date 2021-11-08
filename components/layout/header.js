/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import BtnSign from "../system/btnsign";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <div style={{width:"100%",height:"32px",backgroundColor:'#808080'}}>
        <a href="/">Home</a>
        <span> | </span>
        <a href="/post">Post</a>
        <span> | </span>
        <a href="/job">Job</a>
        <span> | </span>
        <label>Signed in as {session.user.name}</label>
        <span> | </span>
        <BtnSign></BtnSign>
        </div>
    </>)
  }

  return (<>
    <SignArea></SignArea>
  </>)
}
export default Page