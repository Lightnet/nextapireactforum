/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function component({forumID,forums,onChangeForum,ops}){

  const [isNewForum, setIsNewForum] = useState(false);
  //const [isAdmin, setIsAdmin] = useState(false);
  //const [isOwner, setIsOwner] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);

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
      <select defaultValue={forumID || ""} onChange={onChangeForum}>
        <option value='' disabled={true}> Choose here </option>
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
        <button onClick={()=>ops({action:'create',datatype:'forum',id:forumID})}> Create Forum </button>
        <button onClick={()=>ops({action:'edit',datatype:'forum',id:forumID})}> Edit Forum </button>
        <button  onClick={()=>ops({action:'delete',datatype:'forum',id:forumID})}> Delete Forum </button>
        </>
      )}
    </div>
  </>)
}
/*
<select defaultValue={forumID || "DEFAULT"} onChange={onChangeForum}>
<option value='DEFAULT' disabled={true}> Choose here </option>
*/