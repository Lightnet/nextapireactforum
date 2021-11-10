/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";

export default function component(){

  useEffect(()=>{
    //console.log("mount quest");
  },[])

  return(<>
    <div>
      <label>Weclome user.</label>
    </div>
  </>)
}