/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { unixToDate } from "../../../lib/helper";

export default function component({item,ops}){

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div className="headerpanel"> [Comment] <a href="#" onClick={()=>ops({action:"select",datatype:"comment",id:item.id})}>[ID: {item.id}]</a>
      <span style={{float:'right'}}>
        <a href="#" onClick={()=>ops({action:"edit",datatype:"comment",id:item.id})}>EDIT</a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"delete",datatype:"comment",id:item.id})}>DELETE</a>
      </span>
      
      </div>
      <div className="contentpanel"> [Content] {item.content}</div>
      <div  className="footerpanel">
        <label> Date: {unixToDate(item.date)}</label>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"upvote",datatype:"comment",id:item.id})}> Up Vote </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"downvote",datatype:"comment",id:item.id})}> Down Vote </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"tags",datatype:"comment",id:item.id})}> Tags </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"report",datatype:"comment",id:item.id})}> Report </a>
        </div>
    </div>
  )
}