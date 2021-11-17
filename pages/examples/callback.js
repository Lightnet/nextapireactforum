/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://reactjs.org/docs/hooks-reference.html#usecallback
// https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i

import { useState, useEffect, useCallback } from 'react';

function Page() {
  const [count, setCount] = useState(0);
  const [isToggled, setIsToggled] = useState(false);


  //const toggle = useCallback(() => setIsToggled(!isToggled));
  //const toggle = () => setIsToggled(!isToggled);
  //const toggle = useCallback(
    //() => setIsToggled(!isToggled),
    //[isToggled, setIsToggled],
  //);
  const toggle = useCallback(
    () => setIsToggled(state => !state), //clean way
    [isToggled, setIsToggled],
  );
  

  useEffect(() => {
    
  });

  return (<>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
        Click me
      </button>

    <div>
        Boolean is set to <b>{String(isToggled)}</b>.
      </div>

      <button onClick={toggle}>boolean</button>


      


  </>)
}
export default Page