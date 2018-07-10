export function selectCountryAction(country) {
  console.log('changed Country Focus');
    return {
        type: 'SELECT_COUNTRY',
        country
    }
}
