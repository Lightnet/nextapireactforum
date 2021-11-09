# Name: Next API React Forum

# Created By: Lightnet

# Packages:
- next (https://nextjs.org/)
- react (https://reactjs.org/)
- mongoose (MongoDB)

# Information:
  Prototype build for forum.

  The forum will be built by using the nextjs, reactjs and mongoDB json format. Other features will have simple post types like news, blog and other things about community.

  By using the nextjs to have zero or minimal config server, api rest, pre-render client broswer reactjs and other package features.

## Routes:
- https://nextjs.org/docs/api-routes/introduction

## database:
- mongoose (MongoDB)
  - json

- gun ( https://github.com/amark/gun )
  - To build peer to peer database is not easy since it design with people and users in mind.

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
- forum (work in progress)
- board (work in progress)
- post (work in progress)
- comment (work in progress)
- plugin (Not build)
- mod/admin (Not build)
- database

.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/forum"
SECRET="secret"
```