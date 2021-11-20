/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { ForumProvider } from "../components/forum/forumprovider";
import ForumSection from "../components/forum/forumsection";
import NavBarHeader from "../components/layout/header";
import AuthAccess from "../components/system/authaccess";

function Page() {

  return (
  <AuthAccess>
    <NavBarHeader></NavBarHeader>
    <ForumProvider>
      <ForumSection />
    </ForumProvider>
  </AuthAccess>)
}
export default Page