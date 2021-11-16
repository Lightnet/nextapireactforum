/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://javascript.info/fetch
// https://github.github.io/fetch/

// // *GET, POST, PUT, DELETE, etc.

export default async function useFetch(url,args){
  if(!url){
    return console.log("url error");
  }
  if(!args){
    args={};
  }
  args.method = args.method || 'GET';
  if(args.method == 'GET'){
    //console.log('GET!!');
    args.headers = {};
    args.body = null; //can't get body else error 
  }else{
    //args.headers = {};
    args.headers = args.headers || {"Content-Type": "application/json"};
    args.body = args.body || {};
  }

  try{
    let rep = await fetch(url, {
      method:args.method,
      headers: args.headers,
      body:args.body
    });
    let data = await rep.json();
    return data;
  }catch(e){
    console.log("FETCH ERROR");
    console.log(e);
    return {error:'FETCH ERROR'};
  }
}


/**
// Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
 */