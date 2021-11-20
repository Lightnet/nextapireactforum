https://newbedev.com/group-rule-based-authorization-approach-in-node-js-and-express-js


Need to check access expire access later.



create
show
update
destroy

# idea design

First area will be the permission to access to site

second is the access to application like
- forum
- posts

forum
- check register
- userid, isregister, role, fourmid, group (forumuser)
- group permission id , role (fourmaccess)
- forumid, defultrole=user,  (forumconfig)

when accessing the forum query check user id and access

when user fetching type it query access by forum, board, post, comment checks.
- rewrite the docs convert to that user role
- check if user has access to type write, delete, edit

- 
permission
-tagid , forum , board , post , comment (boardaccess)
-type



if user is in forum script witll check which users is accessing to reduce waste data. But still wast data depend on the layers.


when forum id it will check permision id and role

when board id it will check permision id and role

then where the user id check role?
- user, role, access, datatype, tagid

# CALLS:
- permission id (id, role, access, read, write, post)
- user access id (userid, role, access, tagid, datatype)
- user account id (role, id)

- user check if need to register access (forum id, isPublic, isRegister, isAssignRole, default role) 
- user register forum (user id, id form, is pending, default role)





