import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import List from "./List"
import AddList from "./AddList";

const Lists = ( {boardId }) => {
    const lists = useSelector((state) => state.lists);
    const filteredLists = lists.filter(list => list.boardId === boardId);

    return (
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {filteredLists.map((list) => {
            return <List key={list._id} list={list} />;
          })}
        </div>
        <AddList />
      </div>
    );
}

export default Lists;