/*
  LICENSE: MIT
  Created by: Lightnet
*/

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import NavBarHeader from "../components/layout/header";
import AdminSection from "../components/system/adminsection";

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
      <AdminSection></AdminSection>
    </>)
  }
  return (<>
    <div>Admin Only!</div>
    <SignArea></SignArea>
  </>)
}
export default Page