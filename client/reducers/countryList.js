const initialState = []

export default function countryListReducer (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVED_COUNTRIES':
      return action.data 
    default:
      return state
  }
}
