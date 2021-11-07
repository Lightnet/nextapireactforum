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
DATABASE_URL="mongodb://127.0.0.1/my_database"
SECRET="secret"
```