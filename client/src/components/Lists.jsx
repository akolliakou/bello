import React from "react";
import { useSelector } from "react-redux";
import List from "./List"
import AddList from "./AddList";
import { useState } from "react";

const Lists = ( {boardId }) => {
    const lists = useSelector((state) => state.lists);
    const filteredLists = lists.filter(list => list.boardId === boardId);
    const [activeList, setActiveList] = useState("x");

    return (
      <div id="list-container" className="list-container">
        <div id="existing-lists" className="existing-lists">
          {filteredLists.map((list) => {
            return <List key={list._id} list={list} activeList={activeList} setActiveList={setActiveList} />;
          })}
        </div>
        <AddList />
      </div>
    );
}

export default Lists;