import React from "react";
import Cards from "./Cards"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../features/boards/lists";

const List = ({ list }) => {
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleUpdateTitle = () => {
    const updatedList = {
      id: list._id,
      title,
    }
    dispatch(updateList(updatedList))
  }

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            <input
              type="text"
              className="list-title"
              value={title}
              autoFocus={false}
              onChange={handleTitleChange}
              onBlur={handleUpdateTitle}
            />
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <Cards list={list} />
        </div>
      </div>
    </div>
  );
}

export default List;