/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";
import ModSection from "../components/mod/modsection";
import AuthAccess from "../components/system/authaccess";

function Page() {

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <ModSection></ModSection>
  </AuthAccess>)
}
export default Page