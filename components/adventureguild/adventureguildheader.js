/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function component({ops}){

  return(<>
    <div>
        <a href="#" onClick={()=>ops({view:"home"})}>Home</a>
        <span> | </span>
        <a href="#" onClick={()=>ops({view:"quests"})}>Quests</a>
        <span> | </span>
        <a href="#" onClick={()=>ops({view:"library"})}>Library</a>
        <span> | </span>
        <a href="#" onClick={()=>ops({view:"requestform"})}>Request Form</a>
    </div>
  </>)
}