

// https://reactjs.org/docs/hooks-effect.html
// https://next-auth.js.org/getting-started/client
// 
// 
// 

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
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
    </>)
  }
  return (<>
    <div>Welcome to Next.js!</div>
    <SignArea></SignArea>
  </>)
}
export default Page