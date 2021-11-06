/*


*/

//import { getCsrfToken, getProviders } from "next-auth/react";
import { getSession } from "next-auth/react"
import db from "../../lib/database";

export default async (req, res)=>{
  //if(req.method !== 'POST'){
    //return res.status(405).json({message:'Method not allowed!'});
  //}
  const session = await getSession({ req })
  console.log(session);
  let userid;
  let username;
  
  if(session){
    if(!session.user.name){
      return res.json({error:"FAIL"});  
    }
    if(!session.user.token){
      return res.json({error:"FAIL"});  
    }

    if(session.user.token){
      const User = db.model('User');
      const user = await User.findOne({username: session.user.name}).exec();
      if(typeof session.user.token == "string"){
        //console.log("STRING DATA...");
        if(user){
          //console.log("FOUND???");
          let bcheck = user.checkToken(session.user.token);
          //console.log("TOKEN: ", bcheck);
          //console.log(user);
          if(bcheck){
            // pass
            userid = user._id;
            username = user.username;
          }else{
            return res.json({error:"FAIL"});
          }
        }else{
          return res.json({error:"FAIL"});
        }
      }
    }
  }else{
    return res.json({error:"FAIL"});
  }

  const Post = db.model('Post');
  //console.log(Post);

  // config default and other setting later...
  if(req.method == 'GET'){
    let posts = await Post.find({parenttype:'post'}).exec();
    //console.log(posts);
    return res.json({message:"posts",posts:posts});
  }

  //need to config build later for other setting
  if(req.method == 'POST'){

    var postData = JSON.parse(req.body);
    //console.log(postData);
    let post = new Post({
      userid:userid
      , username: username
      , subject: postData.subject
      , content: postData.content
    });
    post.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log("save post");
      return res.json({message:"pass"});
    });
  }

  //return res.json({error:"NOTFOUND"});
};