import React from "react"
import { Link } from "react-router-dom";

const Card = ({ card }) => {
  const date = new Date(card.createdAt);
  let formattedDate;

  if (date.toString() === 'Invalid Date') {
    formattedDate = "";
  } else {
    formattedDate = date.toDateString().slice(4, 10);
  }

  return (
    <Link to={`/cards/${card._id}`}>
      <div className="card-background" >
        <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
            <p>
              {card.title}
            </p>
        </div>
        <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
              {formattedDate}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
        </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;



