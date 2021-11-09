/*
  LICENSE: MIT
  Created by: Lightnet
*/


export default async function useFetch(args){
  if(!args){
    args={};
  }

  args.method = args.method || 'POST';
  args.url = args.url || 'api/post';
  args.body = args.body || {};

  try{
    let rep = await fetch('api/', {
      method:args.method
      , body:args.body
    });
    let data = await rep.json();
    return data;
  }catch(e){
    console.log("FETCH ERROR");
    return null;
  }
}