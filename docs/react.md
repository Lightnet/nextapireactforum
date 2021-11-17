https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks

https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i

```
comment.id //when react clean up it check this for some reason it will error.
comment?.id //added this to when used tmp when passing to child.


```



```js
///one time event mount / unmount
  useEffect(()=>{
    // here is componentDidMount
    console.log("[[=== test mount ===]]");
    return function cleanup() {
      console.log("[[=== test unmount ===]]");
    }
  },[]);
```

```js
useEffect(async ()=>{ // async will not work when clean up

},[]);
```

```js
useEffect(()=>{
    console.log("[[=== mount ===]]");
    return function cleanup() {
      console.log("[[=== unmount socket ===]]");
      if(socket) socket.disconnect();
    }
  },[socket]);//need this socket to able to clean up when unmount else socket will have many socket not disconnect
```