import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { createList } from "../features/boards/lists";

const AddList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [title, setTitle] = useState("")
    let visible;
    addFormVisible ? visible = "selected" : visible = ""

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

      const clearFields = () => {
        setTitle("");
        setAddFormVisible(false);
      };

    const handleAddList = (e) => {
        e.preventDefault()

        const newList = {
            "boardId": id,
            "list": {
                title
            }
        }

        dispatch(createList(newList));
        clearFields();
    }

    return (
      <div id="new-list" className={`new-list ${visible}`}>
        <span onClick={() => setAddFormVisible(!addFormVisible)}>
          Add a list...
        </span>
        <input
          type="text"
          placeholder="Add a list..."
          onChange={handleTitleChange}
          value={title}
        />
        <div>
          <input
            type="submit"
            className="button"
            onClick={handleAddList}
            value="Save"
          />
          <i
            className="x-icon icon"
            onClick={() => setAddFormVisible(!addFormVisible)}
          ></i>
        </div>
      </div>
    );
}

export default AddList;
