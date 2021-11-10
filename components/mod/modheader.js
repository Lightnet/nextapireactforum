/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function component({props}){

  const [data, setData] = useState('text');

  //once init
  useEffect(() => {
    console.log('init once');
  },[]);

  return(<>
    <div>
      <label>Mod</label>
      <span> | </span>
      <a href="#"> Forum </a>
      <span> | </span>
      <a href="#"> Bans </a>
      <span> | </span>
      <a href="#"> Groups </a>
      <span> | </span>
      <a href="#"> Users </a>
      <span> | </span>
      <a href="#"> Tickets </a>
      <span> | </span>
      <a href="#"> Settings </a>
    </div>
  </>)
}