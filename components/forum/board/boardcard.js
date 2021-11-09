/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function component({item,ops}){
  function callid(id){
    console.log(id);
  }
  
  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div>[ Board ] <a href="#" onClick={()=>callid(item.id)}>Test ID</a>  <a href="#" onClick={()=>ops({action:"select",datatype:"board",id:item.id})} >  {item.subject} </a> [ Options ]</div>
      <div>[ Info ] {item.content}</div>
    <div>
      <span> | </span>
      <a href="#"> Tags </a>  
      </div>
    </div>
  )
}