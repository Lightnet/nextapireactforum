

# Design:
 Note that 'import { ReactDOM } from "react";' does not work on pages folder. It is due to server pre-render. As well document variable. But depend where it place.

 Exammple on Notification base simple setup.

```js
ReactDOM.render(
  <NotificationsManager
    setNotify={(notifyFn) => {
      notify = notifyFn;
    }}
  />,
  document.getElementById('notifyContainer')
);
```
- this will fail when creating component folder.
- error on document and render.


# hook::useCallback:
- https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i

```js
const [isToggled, setIsToggled] = React.useState(false);

  // here we added [isToggled, setIsToggled] as a second parameter
  const toggle = React.useCallback(
    () => setIsToggled(!isToggled),
    [isToggled, setIsToggled],
  );
```
- useCallback is only about optimization
- dependencies array

```js
// callback for useState that accepts the current state
setIsToggled(state => !state)
```

# Array:functions:

```js
const [forums, setForums] = useState([]);

let doc={
  id:index, //must different number or id else the react will key={id} will complain.
  subject:'something'
  content:'text'
}

//... add
setForums([...forums,doc]);

//... update 1
function update(args){
  //args.id
  setForums(
    forums.map(item=>
      item.id === args.id
      ? {...item,subject:args.subject,content:args.content}
      : item
  ));
}
//... update 2 with function call //clean?
setSceneObjs(sceneObjs.map(item=>{
	if(item.id === param.id){
	  item.name=param.name;
	  apiUpdateObject3D(item);
	  return {...item, name:param.name};
	}else{
	  return item
	}
}));




//... delete
setForums(forums.filter(item=>item.id !== args.id ));
// loop item match ingore item or skip item
```
- https://www.w3schools.com/jsref/jsref_filter.asp
- https://www.w3schools.com/jsref/jsref_map.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  - Spread syntax (...)
- https://www.samanthaming.com/tidbits/92-6-use-cases-of-spread-with-array/

# Information:
  Using the next.js and react.js to pre-render or preload components to create the page or document. To reduce bandwidth as well rerender the page. It only need query user fetch data from api call that simalar to function calls.


```js
async function APIPost(){
  let res = await fetch('api/user');
  let data = await res.json();
  console.log(data)
}
```
## note:
- api query data

```js
function renderDataTypeModal(){
  if(dataTypeModal == "forum"){
    if(dataModeModal == "create"){
      return <NewForum></NewForum>
    }
    if(dataModeModal == "edit"){
      return <p>Edit Forum Modal</p>
    }
    if(dataModeModal == "delete"){
      return <p>Delete Forum Modal</p>
    }
  }
  return <p>Empty Modal</p>;
}
```
## Notes:
- when the user action depend to able to create, edit, delete post.


# Next.js
  By using the react.js compenonts to reduce query page render by pre-render all commpoents on the page url from next.js server handle. This will reduce reused page used less bandwidth once time use. But if the users access other url path it will load. But note that auth access sign in will unload and clear react components.

  One or two reason is to make sure that user auth access to render those compoents.
  
  As the forum is loaded. User will interact with the react components like posting will render and fetch type method. The compoent will change base on user interacting.


# Forum:
  Forums component will have some module component.

  There will be some center hub for data store.

  ForumSection is handle child from boards, posts, comments and id select.

  It will handle create, post, edit and other things to manage them components.

# Forum Permssion:
  work in progress idea design.  

# passing props:
  Passing props some time time there will be error.



```js
  //...
  //main app
  //...

  //const [message , setmessage ] = useState("This is a notification!");// this will error // it not react component
  const [message , setmessage ] = useState(<label>This is a notification!</label>);//this will work
  const [notify,setNotify] = useState();
  //...

  function info(children, autoClose) {
    console.log("info");
    return setNotify({
      color: Color.info,
      children,
      autoClose,
    });
  }
  //...

  <button onClick={() => info(message, true)}>Info</button>
  <NotificationsManager
    setNotify={notify}
    />

  //...
  //NotificationsManager
  //...
  return (
  <CreateContainer>
    {notifications.map(({ id, ...props }, index) => {
      //console.log(id);
      //console.log(index);
      console.log(props);
      //return (<label key={id}>Hello</label>);
      return (
      <Notification
        key={id}
        onDelete={() => deleteNotification(index)}
        color={props.color}
        autoClose={props.autoClose}
        children={props.children} //it get pass here "message label"
      />);
    })}
  </CreateContainer>
  );

  //...
  //Notification
  //...

  return (<>
    <div className={cn([
        styles.notification,
        styles[color],
        { [styles.slideIn]: !isClosing },
        { [styles.slideOut]: isClosing },
        ])}>
      {/* children > message  > <label>This is a notification! </label> */}
      {children} 
      <button onClick={() => setIsClosing(true)} className={styles.closeButton}> x </button>
    </div>
  </>);

```


