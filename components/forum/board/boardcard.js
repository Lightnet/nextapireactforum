/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://www.w3schools.com/colors/colors_picker.asp
// https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript

//import styles from "./boardcard.module.css";

export default function component({item,ops}){

  //function callid(id){
    //console.log(id);
  //}

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div className="headerpanel">[Board] 
        <a href="#" onClick={()=>ops({action:"select",datatype:"board",id:item.id})}>{item.subject}</a>
        <span style={{float:'right'}}>
          <a href="#" onClick={()=>ops({action:"delete",datatype:"board",id:item.id})}>EDIT</a>
          <span> | </span>
          <a href="#" onClick={()=>ops({action:"delete",datatype:"board",id:item.id})}>DELETE</a>
        </span>
      </div>
      <div className="contentpanel">

        [Content] {item.content}
        
      </div>
    <div className="footerpanel">
      <span> | </span>
      <a href="#"  onClick={()=>ops({action:"tags",datatype:"board",id:item.id})}> Tags </a>  
      </div>
    </div>
  )
}
/*
<a href="#" onClick={()=>callid(item.id)}>Test ID</a>
*/