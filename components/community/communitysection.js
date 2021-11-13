/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import NewCommunity from  "./newcommunity";

export default function component(){
  const [isOpenNewCommunity,setIsOpenNewCommunity] = useState(false);
  const [communities, setCommunities] = useState([]);

  useEffect(()=>{
    loadCommunity();
  },[]);

  async function loadCommunity(){
    let res = await fetch('api/community',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
    setCommunities(data.communities);
  }

  function createCommunity(){
    //if(isOpenNewCommunity){
      setIsOpenNewCommunity(isOpenNewCommunity ? false : true);
    //}
    console.log(isOpenNewCommunity);
  }

  function deleteCommunity(){
    
  }

  return(<>
    <div>
      <button onClick={createCommunity}> Create Community</button>
      <button onClick={deleteCommunity}> Delete Community</button>
       {isOpenNewCommunity && <NewCommunity></NewCommunity>}
       Communities:
       <select>
         {communities.map((item)=>{
           return (
            <option key={item.id}>{item.subject}</option>    
           );
         })}
       </select>
       <input type="checkbox" name="view" value="public"></input><label>Public</label>
       <input type="checkbox" name="view" value="private"></input><label>Private</label>
    </div>
  </>)
}