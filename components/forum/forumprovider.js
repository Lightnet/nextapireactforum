/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { createContext, useContext, useMemo, useState } from "react";

export const ForumContext = createContext();

export function useForum(){
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error(`useForum must be used within a UserContext`)
  }
  //console.log("context:::::::",context);
  //const {fourmID, setForumID} = context;
  //setForumID("test");

  //const value = useMemo(()=>({fourmID:fourmID,setForumID:setForumID}),[forumID:fourmID]);
  //return value;
  //return {fourmID:fourmID, setForumID:setForumID};
  //return [fourmID, setForumID];

  return context;
}

export function useBoard(){
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error(`useForum must be used within a UserContext`)
  }

  const {boardID, setBoardID} = context;

  return {boardID, setBoardID};
}

export function ForumProvider(props){

  const [forumID, setForumID] = useState('');
  const [boardID, setBoardID] = useState('');
  const [postID, setPostID] = useState('');
  const [commentID, setCommentID] = useState('');

  //const value = {
      //forumID:forumID
    //, setForumID:setForumID
  //};

  const value = useMemo(()=> ({
    forumID,setForumID,
    boardID,setBoardID,
    postID,setPostID,
    commentID,setCommentID,

  }),[forumID,boardID,postID,commentID]);

  return <ForumContext.Provider value={value} {...props} />
}

// https://blog.agney.dev/usememo-inside-context/