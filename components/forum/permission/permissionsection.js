/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function component(){

  return(<>
    <div>
      <label>Permission</label>
      <div>
        <label>Forum</label>
        <label>Read</label>
        <labe>Locked</labe>
        <label>Flag</label>
      </div>
      <div>
        <label>Board</label>
        <label>Read</label>
        <label>Write</label>
        <label>Edit</label>
        <label>Delete</label>

        <label>Move</label>
        <label>Ban</label>
        <label>Kick</label>
        <labe>Locked</labe>
        <label>Flag</label>
        <label>Tag</label>
      </div>

      <div>
        <label>Group</label>
        <label>Name</label>
        <label>Role</label>
      </div>
    </div>
  </>)
}