/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import NavBarHeader from "../components/layout/header";
import AdminSection from "../components/system/adminsection";
import AuthAccess from "../components/system/authaccess";

function Page() {

  const { data: session, status } = useSession();

  useEffect(() => {
    //console.log("status:", status)
  });

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <AdminSection></AdminSection>
  </AuthAccess>)
}
export default Page