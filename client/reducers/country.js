function country (state = 'World', action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      console.log(action.country);
      return action.country
    default:
      return state
  }
}

export default country
