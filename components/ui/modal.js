/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://nextjs.org/docs/basic-features/built-in-css-support

import styles from "./modal.module.css";
import { useState, useEffect } from 'react';

export default function Modal({isOpen,closeModal,children}){

  //const [data, setData] = useState('text');
  const [ sDisplay, setsDisplay ]=useState('none');

  useEffect(async () => { 
    if(isOpen==true){
      setsDisplay("block");  
    }
    if(isOpen==false){
      setsDisplay("none");  
    }
  }, [isOpen]);

  //function closeModal(){
    //console.log("close?")
    //setsDisplay("none");
  //}

  return(
    <div className={styles.modal} style={{display:sDisplay}}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>&times;</span>
        
        {children}
      </div>
    </div>
  )
}
/*

<p>Some text in the Modal..</p>

*/