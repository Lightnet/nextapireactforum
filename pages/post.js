/*
  LICENSE: MIT
  Created by: Lightnet
*/

import SignArea from "../components/system/signarea";
import { useSession } from "next-auth/react"
import { useState, useEffect } from 'react';

import PostSection from "../components/forum/post/postsection";
import NewPost from "../components/forum/post/newpost";
import NavBarHeader from "../components/layout/header";

import { useRouter } from 'next/router';

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
    getPosts();
  },[]);

  async function getPosts(){
    let response = await fetch('api/post',{
      method:'GET'
    });
    let data = await response.json();
    console.log("[[[==========data=============================");
    console.log(data);
    setPosts(data.posts);
  }

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      <NavBarHeader></NavBarHeader>
      {/*<button onClick={getPosts}> get posts </button>*/}
      <PostSection
        posts={posts}
       />
      <NewPost></NewPost>
    </>)
  }
  return (<>
    <div>Welcome to Next.js!</div>
    <SignArea></SignArea>
  </>)
}
export default Page