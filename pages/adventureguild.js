/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import NavBarHeader from "../components/layout/header";
import AdventureSection from "../components/adventureguild/adventureguildsection";
import AuthAccess from "../components/system/authaccess";

function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ posts, setPosts]=useState([]);

  useEffect(() => {
    console.log("status:", status);
  });

  useEffect(() => {
    console.log("router.asPath: ",router.asPath);
    console.log("router.query: ",router.query);
    //getPosts();
  },[]);

  /*
  async function getPosts(){
    let response = await fetch('api/post',{
      method:'GET'
    });
    let data = await response.json();
    console.log("[[[==========data=============================");
    console.log(data);
    setPosts(data.posts);
  }
  */

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <AdventureSection></AdventureSection>
  </AuthAccess>)
}
export default Page