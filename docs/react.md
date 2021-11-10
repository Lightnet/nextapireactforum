

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