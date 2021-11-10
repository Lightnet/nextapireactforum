/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import AdventureGuildHeader from "./adventureguildheader";
import QuestSection from "./quest/questsection";
import AdventureGuildHome from "./adventureguildhome";

export default function component(){

  const [view, setView] = useState(null);

  useEffect(()=>{
    console.log("mount")
  },[])

  function ops(args){
    console.log(args)
    if(args.view){
      setView(args.view);
    }
  }

  function viewRender(){
    console.log("view: ", view);
    if(view == "quests"){
      return <QuestSection></QuestSection>
    }else if(view == "home"){
      return <AdventureGuildHome></AdventureGuildHome>
    }

    return (<></>);
  }

  return(<>
    <div>
      <AdventureGuildHeader ops={ops} />
      <div> 
        {viewRender()}
      </div> 
    </div>
  </>)
}