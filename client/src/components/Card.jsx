import React from "react"
import { Link } from "react-router-dom";

const Card = ({ card }) => {
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
            {card.createdAt}
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



