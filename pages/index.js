/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://reactjs.org/docs/hooks-effect.html
// https://next-auth.js.org/getting-started/client
// 

import SignArea from "../components/system/signarea";
import BtnSign from "../components/system/btnsign";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import ForumSection from "../components/forum/forumsection";
//var beta = null;
//var test = beta || "test1";
//console.log("========================test");
//console.log(test);
import NavBarHeader from "../components/layout/header";

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
        <NavBarHeader></NavBarHeader>
        <ForumSection />
    </>)
  }
  return (<>
    <div>Welcome to Next.js!</div>
    <SignArea></SignArea>
  </>)
}
export default Page