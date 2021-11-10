/*
  LICENSE: MIT
  Created by: Lightnet
*/

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";

function Page() {

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
    <div>Welcome to simple forum / posts management.</div>
    <SignArea></SignArea>
  </>)
}
export default Page