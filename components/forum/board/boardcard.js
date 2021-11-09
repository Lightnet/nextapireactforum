/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function component({item,selectBoard}){

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div>[ Board ] <a href="#" onClick={()=>selectBoard(item.id)} >  {item.subject} </a> [ Options ]</div>
      <div>[ Info ] {item.content}</div>
    <div>
      <span> | </span>
      <a href="#"> Tags </a>  
      </div>
    </div>
  )
}