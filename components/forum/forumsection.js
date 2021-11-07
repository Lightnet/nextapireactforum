// https://www.youtube.com/watch?v=Hixx31BX5kY
// https://newbedev.com/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting-selected-on-option

import { useState, useEffect } from 'react';

import BoardSection from "./board/boardsection";
import CommunitySection from "./community/communitysection";
import NewForum from "./newforum";

export default function component(){
  const [isNewForum, setIsNewForum] = useState(false);
  const [boards, setBoards] = useState([]);
  const [forums, setFourms] = useState([]);

  const [forumID, setFourmID] = useState('DEFAULT');

  useEffect(()=>{
    //setBoards([]);
    console.log("init setup");
    getForums();
  },[]);

  useEffect(()=>{
    //setBoards([]);
    console.log("changes forumID...");
    console.log("forumID:",forumID);
  },[forumID]);


  async function getForums(){
    let res = await fetch('api/forum',{
      method:'GET'
    });
    let data = await res.json();
    console.log(data);
    setFourms(data.forums);
  }

  async function getBoards(){
    let _boards = await fetch('api/board',{
      method:'GET'
      //, body: JSON.stringify({id:'index'})
    
    });

    let _baorddata = await _boards.json();
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


      <BoardSection
        boards={boards}
        />      
    </div>
  </>)
}
/*
<CommunitySection />


*/
