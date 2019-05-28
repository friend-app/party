import React from 'react';
import classes from './EventForUser.module.css';
import EventControls from '../EventForCreator/EventControls/EventControls';
// import userChoices from '../EventForCreator/EventUserInfo/userChoice/userChoice';

const EventForUser = props => {
  const users = [
    {
      userId: 1,
      userData: {
        email: 'alex@gmail.com',
        name: 'Alex'
      },
      userChoices: [
        {
          choiceId: 1,
          choiceOptions: {
            bacon: 2,
            cheese: 3,
            meat: 1,
            salad: 2,
            potato: 1
          }
        },
        {
          choiceId: 2,
          choiceOptions: {
            bacon: 2,
            cheese: 3,
            meat: 1,
            salad: 2,
            potato: 1
          }
        }
      ]
    },
    {
      userId: 2,
      userData: {
        email: 'Vityok@gmail.com',
        name: 'Vityok'
      },
      userChoices: [
        {
          choiceId: 1,
          choiceOptions: {
            bacon: 2,
            cheese: 3,
            meat: 1,
            salad: 2,
            potato: 1
          }
        },
        {
          choiceId: 2,
          choiceOptions: {
            bacon: 2,
            cheese: 3,
            meat: 1,
            salad: 2,
            potato: 1
          }
        }
      ]
    }
  ];

  function updateObjectInArray(users, action) {
    const usersCopy = [...users];
    return usersCopy.map(user => {
      if (user.userId === 1) {
        const choiceIndex = user.userChoices.findIndex(
          userChoice => userChoice.choiceId === 2
        );

        const userChoices = {
          userChoices: user.userChoices[choiceIndex]
        };
        // const changedOptions = {
        //   ...userChoices.userChoices,
        //   choiceOptions: {
        //     ...userChoices.userChoices.choiceOptions,
        //     bacon:555
        //   }
        // }

        const huy =  {
          ...user, 
          userChoices: {
            ...user.userChoices,
            [choiceIndex]: {
              ...userChoices[choiceIndex],
              choiceOptions: {
                ...[choiceIndex].choiceOptions, 
                bacon: 555
              }
            }
          }
        }
        console.log(huy);
      }
      return {
        user
      };
    });
  }

  const zalupa = updateObjectInArray(users, 1);

  console.log(zalupa);

  return (
    <div className={classes.EventWrapper}>
      <h1>I'm User</h1>
      <EventControls EventControls={props.eventControls} />
    </div>
  );
};

export default EventForUser;
