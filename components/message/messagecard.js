/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useState, useEffect } from 'react';
  
export default function component({item,ops}){

  return(<>
    <div>
      <label> From: {item.fromid} <button onClick={()=>ops({action:'delete',id:item.id})}>Delete?</button></label>
    </div>
    <div>
      <label> Message: {item.subject} </label>
    </div>
    <div>
      <label> Content: {item.content} </label>
    </div>
  </>)
}