/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
import AdminSection from "../components/admin/adminsection";

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