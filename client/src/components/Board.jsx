import React from "react";
import { fetchBoard } from "../features/boards/boards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom"
import Lists from "./Lists"

const Board = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);

  const path = useLocation().pathname;

  const isBoardsPath = path.includes('boards');
  let boardId;
  const cards = useSelector((state) => state.cards);

  if (isBoardsPath) {
    boardId = id;
  } else {
    const card = cards.find(c => c._id === id);
    if (card) {
      boardId = card.boardId
    }
  }

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }   
  }, [dispatch, boardId]);
 
  const board = boards.find(b => b._id === boardId);

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
        <Lists boardId={boardId} />
      </main>
    </>
  );
}

export default Board;
