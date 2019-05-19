function updateObjectInArray(users, action) {
  return users.map(user => {
    if (user.userId === 1) {
      const choiceById = user.userChoices.find(
        userChoice => userChoice.choiceId === 2
      );
      const choiceOptions = {
        ...choiceById.choiceOptions,
        bacon: 555
      };
      return { ...user, userChoices: {
        ...choiceById, 
        choiceOptions: {...choiceOptions}
      } };
    }
    return {
      user
    };
  });
}