/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react";
import Sign from "./sign";

export default function component({children}){

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <label>Loading...</label>
  }

  if (status === "authenticated") {
    return (<>
      {children}
    </>)
  }
  return (<>
    <div>Access!</div>
    <Sign></Sign>
  </>)
}