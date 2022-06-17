import React from "react";
import { fetchLists } from "../features/boards/boards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Lists = () => {
    const lists = useSelector((state) => state.lists);

    return (
        <div id="list-container" className="list-container">
            <div id="existing-lists" className="existing-lists">
                {lists.map(list => {
                  return <List /> // do we need to pass down props or do it another way? 
                })}
            </div>
        </div>
    )
}