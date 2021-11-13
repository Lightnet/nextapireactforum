


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
- when the user action depend to able to create, edit, delete post



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




