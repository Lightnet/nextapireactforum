/*
  LICENSE: MIT
  Created by: Lightnet
*/

import ForumSection from "../components/forum/forumsection";
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";

function Page() {

  return (<AuthAccess>
    <NavBarHeader></NavBarHeader>
    <ForumSection />
  </AuthAccess>)
}
export default Page