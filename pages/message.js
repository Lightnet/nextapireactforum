/*
  LICENSE: MIT
  Created by: Lightnet
*/

import MessageSection from "../components/message/messagesection";
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";

function Page() {

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <MessageSection />
  </AuthAccess>)
}
export default Page