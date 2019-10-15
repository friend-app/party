import React from "react";
import CreatorBottomNavigationItem from "./CreatorBottomNavigationItem/CreatorBottomNavigationItem";
import classes from "./CreatorBottomNavigationItems.module.css";
import choicesImg from "../../assests/my order orange.svg";
import eventImg from "../../assests/party orange.svg";
import foodCardsImg from "../../assests/cards orange.svg";
import ingredientImg from "../../assests/ingredients orange.svg";
import summaryImg from "../../assests/summary orange.svg";

const CreatorBottomNavigationItems = props => {
  return (
    <nav className={classes.CreatorBottomNavigationItems}>
      <CreatorBottomNavigationItem
        link="/events/eventForCreator"
        isExact={true}
      >
        <img src={eventImg} alt="icon"></img>
        <span>Main Event</span>
      </CreatorBottomNavigationItem>
      <CreatorBottomNavigationItem
        link="/events/eventForCreator/creatorChoices"
        isExact={false}
      >
        <img src={choicesImg} alt="icon"></img>
        <span>Food Choice</span>
      </CreatorBottomNavigationItem>
      <CreatorBottomNavigationItem
        link="/events/eventForCreator/creatorChoicesCards"
        isExact={true}
        choicesAmount={props.choicesAmount}
      >
        <img src={foodCardsImg} alt="icon"></img>
        <span>Food Cards</span>
      </CreatorBottomNavigationItem>
      <CreatorBottomNavigationItem
        link="/events/eventForCreator/ingredientList"
        isExact={true}
      >
        <img src={ingredientImg} alt="icon"></img>
        <span>Ingredients</span>
      </CreatorBottomNavigationItem>
      <CreatorBottomNavigationItem
        link="/events/eventForCreator/allChoices"
        isExact={true}
      >
        <img src={summaryImg} alt="icon"></img>
        <span>Summary</span>
      </CreatorBottomNavigationItem>
    </nav>
  );
};

export default CreatorBottomNavigationItems;
