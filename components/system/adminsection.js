/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { useState, useEffect } from 'react';
import AdminHeader from "../admin/adminheader";

export default function component(){
  const [isMaintainMode,setIsMaintainMode] = useState(false);
  const [view, setView] = useState(null);

  async function btnMaintainMode(){
    setIsMaintainMode(!isMaintainMode)
    console.log(isMaintainMode);
    let res = await fetch('api/admin',{
      method:'POST',
      body:JSON.stringify({action:'maintain'})
    })
    let data = await res.json();
    console.log(data);
  }

  function contentRender(){

    return <></>;
  }


  return(<>
    <div>
      <AdminHeader></AdminHeader>
      <div>
        <button onClick={btnMaintainMode}> Maintain Mode {isMaintainMode? "Off":"On"} </button>
      </div>
      {contentRender()}
    </div>
  </>)
}