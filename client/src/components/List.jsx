import React from "react";
import Cards from "./Cards"
import AddCard from "./AddCard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../features/boards/lists";

const List = ({ list, activeList, setActiveList }) => {
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();
  const active = activeList === list._id ? "add-dropdown-active" : "";

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
    <div className={`list-wrapper ${active}`}>
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
          <Cards list={list} />
          <AddCard setActiveList={setActiveList} listId={list._id}/>
        </div>
      </div>
    </div>
  );
}

export default List;