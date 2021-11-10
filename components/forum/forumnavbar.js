/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';
import { isEmpty } from '../../lib/helper';
import NewForum from "./newforum";

export default function component({forumID,forums,onChangeForum}){

  const [isCreate,setIsCreate] = useState(true);
  const [isNewForum, setIsNewForum] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);


  //display create forum
  function createForum(){
    setIsNewForum(isNewForum ? false : true)
  }

  function getForumID(){
    console.log(forumID);
  }
  //forumID
  function forumIDRender(){
    if(forumID){
      return <label> ID: {forumID} </label>
    }
    return <></>
  }

  function toggleOption(){
    setIsOpenOptions(!isOpenOptions)
  }

  return(<>
    <div>
      <label>Forum: </label>
      <select defaultValue={forumID || "DEFAULT"} onChange={onChangeForum}>
        <option value='DEFAULT' disabled={true}> Choose here </option>
        {forums.map((item)=>{
          return(
            <option key={item.id} value={item.id}> {item.subject} </option>
          )
        })}
      </select>
      {forumIDRender()}
      <button onClick={toggleOption}> Option </button>
      {isOpenOptions && (
        <>
        <button onClick={createForum}> Create Forum </button>
        <button> Delete Forum </button>
        </>
      )}
      

      {isNewForum && <NewForum />}
    </div>
  </>)
}