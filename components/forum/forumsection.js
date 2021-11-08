/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.youtube.com/watch?v=Hixx31BX5kY
// https://newbedev.com/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting-selected-on-option

import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";
//import CommunitySection from "./community/communitysection";
import NewForum from "./newforum";

export default function component(){
  //forum
  const [isNewForum, setIsNewForum] = useState(false);
  const [forums, setFourms] = useState([]); //use
  const [forumID, setFourmID] = useState('DEFAULT'); // use

  //board
  const [boards, setBoards] = useState([]); // not use
  const [isBoard, setIsBoard] = useState(false);

  //post ? 

  useEffect(()=>{
    //setBoards([]);
    console.log("init setup");
    getForums();
  },[]);

  async function getForums(){
    let res = await fetch('api/forum',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
    if(data.error){
      console.log("ERROR GET FORUM ");
      return;
    }
    if(data.message){
      setFourms(data.forums);
    }
  }

  async function getBoards(){
    let res = await fetch('api/board',{
      method:'POST'
      , body: JSON.stringify({forumid:forumID})
    });

    let _baorddata = await res.json();
    console.log(_baorddata);
    setBoards(_baorddata.boards);
  }

  function createForum(){
    setIsNewForum(isNewForum ? false : true)
  }

  function onChangeForum(e){
    //console.log(e.target.value);
    //console.log("forumID");
    setFourmID(e.target.value);
    console.log(forumID);
  }

  function checkForumBoard(){
    if(isBoard){
      return( <BoardSection boards={boards} forumid={forumID} />);
    }else{
      return( <label> Board Empty! </label> );
    }
  }

  return(<>
    <div>
      <label>Forum</label>
      <button onClick={createForum}> Create Forum </button>
      <button> Delete Forum </button>

      {isNewForum && <NewForum />}
      
      <select defaultValue={forumID || "DEFAULT"} onChange={onChangeForum}>
        <option value='DEFAULT' disabled={true}> Choose here </option>
        {forums.map((item)=>{
          return(
            <option key={item.id} value={item.id}> {item.subject} </option>
          )
        })}
      </select>

      {checkForumBoard()}


      
    </div>
  </>)
}
/*
<BoardSection
        boards={boards}
        />
*/
