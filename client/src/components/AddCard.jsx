import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../features/boards/cards";

const AddCard = ( { setActiveList, listId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  
  const handleCardToggle = () => {
    setActiveList(listId);
  }

  const handleCardClose = () => {
    setActiveList("");
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const clearTextArea = () => {
    setTitle("");
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      listId,
      card: {
        title,
      } 
    }
    dispatch(addCard(newCard));
    clearTextArea();
    handleCardClose();
  }
  
  return (
    <>
      <div className="add-dropdown add-bottom active-card">
        <div className="card">
          <div className="card-info"></div>
          <textarea name="add-card" value={title} onChange={handleTitleChange}></textarea>
          <div className="members"></div>
        </div>
        <a className="button" onClick={handleAddCard}>Add</a>
        <i className="x-icon icon" onClick={handleCardClose}></i>
        <div className="add-options">
          <span>...</span>
        </div>
      </div>
      <div className="add-card-toggle" data-position="bottom" onClick={handleCardToggle}>
        Add a card...
      </div>
  </>
  )
}

export default AddCard;