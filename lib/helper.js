import { customAlphabet } from 'nanoid';

// https://zelark.github.io/nano-id-cc/

export function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 16)();
}

export function nanoid32(){
  // ~107 billion years needed, in order to have a 1% probability of at least one collision.
  //nanoid() //=> "zTzQvWe5X0irVfJeQJ6GzS6DhGBux79c"
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 32)();
}

//check for empty string
export function isEmpty(str) {
  return (!str || str.length === 0 || !str.trim());
}

// https://gist.github.com/robatron/5681424

// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number

//isDebug controls the entire site.
var isDebug = true;

//debug.js
export function debug(msg, level){
  if(isDebug){
    var Global = this;
    //if(!(Global.isDebug && Global.console && Global.console.log)){
    //if(!(Global.console && Global.console.log)){
        //return;
    //}
    level = level||'info';
    //Global.console.log(level + ': '+ msg);
    console.log(level + ': '+ msg);
  }
}

//main.js
//debug('Here is a msg.');









