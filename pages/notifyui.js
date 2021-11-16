/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useSession } from "next-auth/react"
import React,{ useState, useEffect } from 'react';
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";
//import Blank from "../components/blankcomponent";

//import {Notification, Color} from "../components/notify";
//import {Notification, Color, info, success, warning, error} from "../components/notify";
//import NotificationsManager from "../components/notify/notificationmanger";
import {NotificationsManager, Color} from "../components/notify";
import CreateContainer from "../components/notify/createcontainer";

//let notify;

function Page() {

  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [message , setmessage ] = useState(<label>This is a notification!"</label>);
  const [notify,setNotify] = useState();

  useEffect(() => {
    console.log("status:", status)
  });

  function info(children, autoClose) {
    console.log("info");
    return setNotify({
      color: Color.info,
      children,
      autoClose,
    });
  }

  function success(children, autoClose) {
    return setNotify({
      color: Color.success,
      children,
      autoClose,
    });
  }
  
  function warning(children, autoClose) {
    return setNotify({
      color: Color.warning,
      children,
      autoClose,
    });
  }
  
  function error(children, autoClose) {
    return setNotify({
      color: Color.error,
      children,
      autoClose,
    });
  }

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>

    <label>Hello Blank</label>
    <button onClick={() => info(message, true)}>Info</button>
    <button onClick={() => success(message, true)}>Success</button>
    <button onClick={() => warning(message, true)}>Warning</button>
    <button onClick={() => error(message, true)}>Error</button>

    <NotificationsManager
      setNotify={notify}
    />

    {/*
    <CreateContainer>
    {notifications.map(({ id, color }) => (
      <Notification 
        key={id} 
        color={color}
        onDelete={() => deleteNotification(id)}
        autoClose={true}
        >
        <label>{message}</label>
      </Notification>
    ))}
    </CreateContainer>
    */}
  </AuthAccess>)
}
export default Page
/*
    <button onClick={() => info(message, true)}>Info</button>
    <button onClick={() => success(message, true)}>Success</button>
    <button onClick={() => warning(message, true)}>Warning</button>
    <button onClick={() => cerror(message, true)}>Error</button>




*/