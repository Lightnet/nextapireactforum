/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useState, useEffect } from 'react';

export default function component(){

  return(<>
    <div style={{overflow:'scroll',height:'calc(100% - 32px)'}}>
      <label>Permission</label>
      
      <table>
        <tbody>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input></input>
            </td>
          </tr>

          <tr>
            <td>
              <label>Group:</label>
            </td>
            <td>
              <input></input>
            </td>
          </tr>

          <tr>
            <td>
              <label>Role:</label>
            </td>
            <td>
              <input></input>
            </td>
          </tr>

        </tbody>
      </table>
      <div>
        <div className="headerpanel">
        <label>Forum</label>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Read</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Write</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Edit</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Delete</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Locked</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Ban</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Kick</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Roles</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Groups</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div className="headerpanel">
        <label>Board</label>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Read</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Write</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Edit</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Delete</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Locked</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Move</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Flag</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div className="headerpanel">
        <label>Post</label>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Read</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Write</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Edit</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Delete</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Locked</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Move</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Flag</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div className="headerpanel">
        <label>Comment</label>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Read</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Write</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Edit</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Delete</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Locked</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Move</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Flag</label>
              </td>
              <td>
                <input type="checkbox"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </>)
}