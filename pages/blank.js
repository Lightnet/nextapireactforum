/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
import Blank from "../components/blankcomponent";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <label>Hello Blank</label>
    <Blank></Blank>
  </AuthAccess>)
}
export default Page