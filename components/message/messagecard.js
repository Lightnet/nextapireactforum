/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { useState, useEffect } from 'react';
  
export default function component({item}){

  return(<>
    <div>
      <label> Message: {item.subject} </label>
    </div>
    <div>
      <label> Content: {item.content} </label>
    </div>
  </>)
}