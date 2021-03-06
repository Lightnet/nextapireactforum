/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://mongoosejs.com/docs/promises.html
import { getCsrfToken, getProviders } from "next-auth/react";
import clientDB from "../../lib/database";

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");
  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  //console.log("csrfToken:",csrfToken);
  const db = await clientDB();
  const User = db.model('User');

  console.log("req.body");
  console.log(req.body);
  let userData = JSON.parse(req.body);
  console.log(userData);
  
  const user = await User.findOne({username: userData.alias}).exec();
  //console.log("user");
  //console.log(user);
  if(userData.newUser){//sign up for new user
    if(!user){
      console.log("[newUser] NOT FOUND, creating...")
      //create user
      let newUser = new User({username: userData.alias})
      newUser.setPassword(userData.passphrase);
      try{
        let saveUser = await newUser.save();
        console.log("Save User!");
        return res.json(saveUser.toAuthJSON());
      }catch(e){
        return res.json({error:"FAIL"});
      }
    }else{
      console.log("[newUser] Exist!");
      return res.json({error:"EXIST"});
    }
  }else{
    if(!user){
      console.log("[login] NOT FOUND")
      return res.json({error:"NOTFOUND"});
      //create user
    }else{
      console.log("[login] Exist");
      if(user.validPassword(userData.passphrase)){
        console.log("[login] Password Pass!");
        return res.json(user.toAuthJSON());
      }else{
        console.log("[login] Password Fail!");
        return res.json({error:"PASSWORDFAIL"});
      }
    }
  }

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};