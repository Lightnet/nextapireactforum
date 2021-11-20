https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks

https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i

```
comment.id //when react clean up it check this for some reason it will error.
comment?.id //added this to when used tmp when passing to child.
```



# Context:
  There are different way to used context, Provider, use<name>, memo.


```js
import { createContext, useContext, useMemo, useState } from "react";

// create content variable for store data
export const ForumContext = createContext();

// check Provider root level top
export function useForum(){
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error(`useForum must be used within a UserContext`)
  }
  return context;
}

// create branch off forum
export function useBoard(){
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error(`useForum must be used within a UserContext`)
  }
  const {boardID, setBoardID} = context;
  return {boardID, setBoardID};
}

// this context props top root level that pass to child component
export function ForumProvider(props){
  const [forumID, setForumID] = useState('');
  const [boardID, setBoardID] = useState('');
  const [postID, setPostID] = useState('');
  const [commentID, setCommentID] = useState('');

  const value = useMemo(()=> ({
    forumID,setForumID,
    boardID,setBoardID,
    postID,setPostID,
    commentID,setCommentID,
  }),[forumID,boardID,postID,commentID]);

  return <ForumContext.Provider value={value} {...props} />
}

//... child
// import {useForum} from "../forumprovider"

function ForumSection(){

  const {forumID, setForumID} = useForum();
  const {boardID, setBoardID} = useBoard();

  return (<>
    <label> Forum </label>
  </>)
}

//... app root area

return (<>
  <ForumProvider>
    <ForumSection />
  </ForumProvider>
</>)






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