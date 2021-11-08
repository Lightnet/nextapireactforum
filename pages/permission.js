/*
  LICENSE: MIT
  Created by: Lightnet
*/

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import NavBarHeader from "../components/layout/header";
import PermissionSection from "../components/forum/permission/permissionsection";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  //check access
  function checkPermission(){

  }

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <NavBarHeader></NavBarHeader>
      <PermissionSection></PermissionSection>
    </>)
  }
  return (<>
    <SignArea></SignArea>
  </>)
}
export default Page