// https://gist.github.com/robatron/5681424
var ISDEBUG=true;

export function log(...args){
  if(ISDEBUG){
    //console.log('[log]',...args);
    console.log.apply(this, args);
  }
}