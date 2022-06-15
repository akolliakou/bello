import React from "react";
import { fetchBoard } from "../features/boards/board";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Board = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard());
  }, [dispatch]);

  return (
    <>
    <header>
     <ul>
       <li id="title">My Title</li>
       <li className="star-icon icon"></li>
       <li className="private private-icon icon">Private</li>
     </ul>
     <div className="menu">
       <i className="more-icon sm-icon"></i>Show Menu
     </div>
     <div className="subscribed">
       <i className="sub-icon sm-icon"></i>Subscribed
     </div>
   </header>
   <main>
     <div id="list-container" className="list-container">
       <div id="existing-lists" className="existing-lists">
         {/* Render Lists Here */}
       </div>
     </div>
   </main>
   </>
  )
}

export default Board;
