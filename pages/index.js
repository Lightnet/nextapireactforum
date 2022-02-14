/*
  LICENSE: MIT
  Created by: Lightnet
*/

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";
import ThemeLink from "../components/theme/themelink";
//import NotiftyTest from "../components/notify/notiftytest";

export default function Page() {

  const { data: session, status } = useSession();
  //console.log(session);

  useEffect(() => {
    //console.log("status:", status)
  });

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <NavBarHeader></NavBarHeader>
      <label>Work in progress.</label>
    </>)
  }
  return (<>
    <div>Welcome to simple forum / posts management. <ThemeLink /></div>
    <SignArea></SignArea>
    
  </>)
}
// <NotiftyTest />