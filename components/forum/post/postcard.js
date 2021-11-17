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
      <div className="headerpanel" style={{width:'100%',height:'24px'}}>
        
        <a href="#" onClick={()=>ops({action:"select",datatype:"post",id:item.id})} style={{display:'block',width:'calc(100% - 128px)'}}>
        [POST] [ID:{item.id}] {item.subject}
        </a>
        <span style={{position:'relative',top:'-16px',right:'4px', float:'right',height:'18px'}}>
          <a href="#" onClick={()=>ops({action:"edit",datatype:"post",id:item.id})}>EDIT</a>
          <span> | </span>
          <a href="#" onClick={()=>ops({action:"delete",datatype:"post",id:item.id})}>DELETE</a>
        </span>
      </div>
      <div className="contentpanel"> 
        [Content] {item.content}</div>
      <div className="footerpanel">
        <label> Date: {unixToDate(item.date)}</label>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"upvote",datatype:"post",id:item.id})}> Up Vote </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"downvote",datatype:"post",id:item.id})}> Down Vote </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"select",datatype:"post",id:item.id})}> Comment </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"tags",datatype:"post",id:item.id})}> Tags </a>
        <span> | </span>
        <a href="#" onClick={()=>ops({action:"report",datatype:"post",id:item.id})}> Report </a>
      </div>
    </div>
  )
}