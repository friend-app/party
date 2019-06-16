import React from 'react';

export function makeChosenIngs(ings) {
  const chosenIngsArray = [];

  for (let key in ings) {
    if (ings[key] > 0) {
      chosenIngsArray.push({ name: key, amount: ings[key] });
    }
  }

  let chosenIngs = <p>Please Choose Ingredients</p>;

  if (chosenIngsArray.length > 0) {
    chosenIngs = chosenIngsArray.map((ing, index) => {
      return (
        <h3 key={index}>
          <strong>{ing.name.charAt(0).toUpperCase() + ing.name.slice(1)} - {ing.amount}</strong>
        </h3>
      );
    });
  }

  return chosenIngs;
}
