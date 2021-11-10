/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://www.w3schools.com/colors/colors_picker.asp
// https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript

//import styles from "./boardcard.module.css";

export default function component({item,ops}){

  function callid(id){
    console.log(id);
  }

  return(
    <div key={item.id} style={{
      width:'100%'
    }}>
      <div className="headerpanel">[ Board ] 
        <a href="#" onClick={()=>callid(item.id)}>Test ID</a>  
        <a href="#" onClick={()=>ops({action:"select",datatype:"board",id:item.id})}>{item.subject}</a> [ Options ]
      </div>
      <div style={{
        //borderStyle:"solid",
        backgroundColor:"#e6e6e6"
      }}>
        [ Content ] {item.content}
        
      </div>
    <div style={{
        //borderStyle:"solid",
        backgroundColor:"#f2f2f2"
      }}>
      <span> | </span>
      <a href="#"> Tags </a>  
      </div>
    </div>
  )
}
/*
className={styles.header}
*/