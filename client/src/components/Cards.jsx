import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";


const Cards = ({ list }) => {
  const cards = useSelector((state) => state.cards);
  const filteredCards = cards.filter(card => card.listId === list._id)

  return (
    <div id="cards-container" data-id="list-1-cards">
        {filteredCards.map((card) => {
          return <Card key={card._id} card={card} />;
        })}
    </div>
  );
}

export default Cards;



