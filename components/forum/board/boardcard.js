/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://www.w3schools.com/colors/colors_picker.asp
// https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript
// https://stackoverflow.com/questions/4861230/make-a-link-have-100-width/27491302
//import styles from "./boardcard.module.css";

import { unixToDate } from "../../../lib/helper"

export default function component({item,ops}){

  //function callid(id){
    //console.log(id);
  //}
  /*
  
  style={{display:'block',width:'100%'}}
  */

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div className="headerpanel" style={{width:'100%',height:'24px'}}>
        <a href="#" onClick={()=>ops({action:"select",datatype:"board",id:item.id})} style={{display:'block',width:'calc(100% - 128px)'}}>
        [Board] [ID:{item.id}] {item.subject}</a>
        <span style={{position:'relative',top:'-16px',right:'4px', float:'right',height:'18px'}}>
          <a href="#" onClick={()=>ops({action:"edit",datatype:"board",id:item.id})}>EDIT</a>
          <span> | </span>
          <a href="#" onClick={()=>ops({action:"delete",datatype:"board",id:item.id})}>DELETE</a>
        </span>
      </div>

      <div className="contentpanel">

        [Content] {item.content}
        
      </div>
    <div className="footerpanel">
      <label> Date: {unixToDate(item.date)}</label>
      <span> | </span>
      <a href="#"  onClick={()=>ops({action:"tags",datatype:"board",id:item.id})}> Tags </a>  
      </div>
    </div>
  )
}
/*
<a href="#" onClick={()=>callid(item.id)}>Test ID</a>
*/