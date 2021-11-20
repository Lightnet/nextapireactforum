# Name: Next API React Forum

# Created By: Lightnet

# Packages:
- next (https://nextjs.org/)
- react (https://reactjs.org/)
- mongoose (https://www.mongodb.com/)

# Information:
  Prototype build for forum.

  The forum will be built by using the Next.js, React.js and MongoDB json format. Other features will have simple post types like news, blog and other things about community.

  By using the Next.js to have zero or minimal config server, api rest, pre-render client broswer reactjs and other package features.

## Links:
  Work in progress. Due to linking id system is not build to reference the post or comment.

## Encryption and Security:
  The account is encryption for password. Auth checks built with next-auth for url checks and method. 

  Currently post content is not encrypt as work in progress. Note that search function will take longer to search for keywords.
  
  Need work on other things.

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

  Next.js is design to have preload to reduce page render request. The server create react component once to pre-render client browser but get query request of data change on add, update, delete, edit, theme colors and other things.

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
- auth 
  - sign up page (added / simple)
  - sign in page (added / simple)
  - error page (added)
  - token (added)
  - reuse token and session check in api  (added)
- plugin (Not build)
- mod (Not build)
  - layout
- admin (Not build)
  - top level ?
  - layout
- access/permission (not build)
  - forum (not build)
  - board (not build)
  - post (not build)
  - comment (not build)
  - ...
- forum (work in progress)
  - create (added)
  - edit (added)
  - delete (added)
    - children delete (added)
  - list (added)
  - try catch (added)
- board (work in progress)
  - create (added)
  - edit (added)
  - delete (added)
	  - child (added)
  - list (added)
  - try catch (added)
- post (work in progress)
  - create (added)
  - edit (added)
  - delete (added)
  	- child (added)
  - list (added)
  - try catch (added)
- comment (work in progress)
  - create (added)
  - edit (added)
  - delete (added)
  - list (added)
  - try catch (added)
- database
  - user (added)
  - forum (added)
  - board (added)
  - post (added)
  - comment (added)
  - permission (not build)
- adventureguild (not build)
- artisanguild (not build)
- merchantguild (not build)
- web socket chat (added)
  - list users (not build)
  - join and leave event (not build)

## bugs:
- no check for access
- odd delete post not fully delete forum.
- database setup error not async or load correctly.

## prefix guild:
  Those are just prototype idea base on real life to keep it simple to genre types.


.env
```
HOST="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://127.0.0.1/forum"
SECRET="secret"
```

# Credits:

- Author: Seif Ghezala
  - Notifications/Toasts with 0 dependencies
  - Note modifed a bit to fit the nextjs prerender load.
  - https://twitter.com/seif_ghezala
  - https://github.com/tinloof/notify
  - https://tinloof.com/blog/how-to-create-react-notifications-with-0-dependencies/