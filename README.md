# Name: Next API React Forum

# Created By: Lightnet

# Packages:
- next.js
- react.js
- mongoose (MongoDB)

# Information:
  Prototype build for next.js using just react component, mongodb, nodejs and other other packages to create forum, post and other things about community.

  The design is Rest API to keep the server load simple.

## Routes:
- https://nextjs.org/docs/api-routes/introduction

## database:
- mongoose (MongoDB)

  To build peer to peer database is not easy since it design with people and users in mind.

## Account:
  It will not used link account system from other third party. But add next-auth and required some config to work correctly.

## Design:
  There are component, api server, page and database.

### Layers:
- page (client browser)
- page/api (http server request and response)
- database (local desktop)
- components (react component / client browser)
- translate api scripts

There should be five area when developementing.

```
=========================================
| client                                |
|                                       |
|  url                 api (url calls)  |
=========================================
    ^                            | ^
    |                            V |
  pre-render                   query
=========================================
| nextjs ( server )        api (server) | 
| react                    auth         |
| auth                     database     |
| database                              |
=========================================
```

  Nextjs is design to have preload to reduce request for pre-render client browser but get query request of data change on add, update, delete, edit, theme colors and other things.

## example:
```
pages/post (folder)
- this will handle client render
- using api to call data for get and post data
- component will change on the fly.

pages/api/post (folder)
- this will handle get and post simlar to function call.
- get all posts list
- post is to save, edit and delete.
```




# TO DO LIST:
- Need to design serverless database peer to peer forum (not build)
- auth (simple login user and password)
- access/permission (not build)
- post (work in progress)
- board (work in progress)
- plugin (Not build)
- mod/admin (Not build)


.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/forum"
SECRET="secret"
```