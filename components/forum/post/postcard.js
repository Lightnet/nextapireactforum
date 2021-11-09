/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function component({item,selectPost}){

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div> [POST] <a href="#" onClick={()=>selectPost(item.id)}> {item.subject}</a></div>
      <div> [Content] {item.content}</div>
      <div>
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