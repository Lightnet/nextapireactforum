/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function component({item,ops}){

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div className="headerpanel"> [Comment] <a href="#" onClick={()=>ops({action:"select",datatype:"comment",id:item.id})}> {item.subject}</a></div>
      <div className="contentpanel"> [Content] {item.content}</div>
      <div  className="footerpanel">
      <a href="#"> Up Vote </a>
      <span> | </span>
      <a href="#"> Down Vote </a>
      <span> | </span>
      <a href="#"> Comment </a>
      <span> | </span>
      <a href="#"> Tags </a>
      <span> | </span>
      <a href="#"> Report </a>
      </div>
    </div>
  )
}