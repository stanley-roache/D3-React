function country (state = 'World', action) {
  switch (action.type) {
    case 'SELECT_COUNTRY':
      return action.country
    default:
      return state
  }
}

export default country