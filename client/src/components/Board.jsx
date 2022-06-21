import React from "react";
import { fetchBoard } from "../features/boards/boards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import Lists from "./Lists"

const Board = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);
 
  const board = boards.find(b => b._id === id);

  if (!board) {
    return null;
  }

  return (
    <>
      <header>
        <ul>
          <li id="title">{board.title}</li>
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
        <Lists />
      </main>
    </>
  );
}

export default Board;
