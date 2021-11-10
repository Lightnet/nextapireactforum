/*
  LICENSE: MIT
  Created by: Lightnet
*/


import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";
import PermissionSection from "../components/forum/permission/permissionsection";
import AuthAccess from "../components/system/authaccess";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  //check access
  function checkPermission(){

  }

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <PermissionSection />
  </AuthAccess>)
}
export default Page