/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import useFetch from "../components/hook/usefetch";
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
//import Blank from "../components/blankcomponent";

function Page() {

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log("status:", status)
  });

  async function APIPost(){
    let data = await useFetch('api',{
      method:'POST',
      body:JSON.stringify({
        action:'test'
      })
    });

    console.log(data);
  }

  async function APIGet(){
    let data = await useFetch('api',{
      //method:'GET'
    });

    console.log(data);
  }

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <label>Hello Blank</label>
    <button onClick={APIPost}>fetch post</button>
    <button onClick={APIGet}>fetch get</button>
  </AuthAccess>)
}
export default Page