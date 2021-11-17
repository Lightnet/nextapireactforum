/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

function Page() {
  const [count, setCount] = useState(0);

  //useEffect(() => {
  //});

  return (<>
    <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>


  </>)
}
export default Page