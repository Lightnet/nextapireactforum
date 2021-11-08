/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { useState, useEffect } from 'react';

export default function component(){
  const [isMaintainMode,setIsMaintainMode] =useState(false)

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


  return(<>
    <div>
      <div>
        <label>Admin</label>
        <br />
        <button onClick={btnMaintainMode}> Maintain Mode {isMaintainMode? "Off":"On"} </button>
      </div>
      <div>
        <label>Forums</label>
      </div>
      <div>
        <label>Bans</label>
      </div>

      <div>
        <label>Groups</label>
      </div>

      <div>
        <label>Users</label>
      </div>
    </div>
  </>)
}