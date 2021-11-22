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
  const [forums, setForums] = useState([]);

  const [boardID, setBoardID] = useState('');
  const [boards, setBoards] = useState([]);

  const [postID, setPostID] = useState('');
  const [posts, setPosts] = useState([]); 

  const [commentID, setCommentID] = useState('');
  const [comments, setComments] = useState([]);

  const value = useMemo(()=> ({
    forumID,setForumID,
    forums, setForums,
    boardID,setBoardID,
    boards, setBoards,
    postID,setPostID,
    posts, setPosts,
    commentID,setCommentID,
    comments, setComments
  }),[
    forumID,
    forums,
    boardID,
    boards,
    postID,
    posts,
    commentID,
    comments
  ]);

  return <ForumContext.Provider value={value} {...props} />
}

// https://blog.agney.dev/usememo-inside-context/