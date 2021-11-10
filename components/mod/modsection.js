/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import ModHeader from "./modheader";

export default function component({props}){

  const [data, setData] = useState('text');

  //once init
  useEffect(() => {
    console.log('init once');
  },[]);

  return(<>
    <div>
      <ModHeader></ModHeader>
      <label>Work in progress...</label>
    </div>
  </>)
}