export default function data(state = [], action) {
    switch (action.type) {
        case 'UPDATE_DATA':
            console.log('updating data');
            return action.data
        default:
            return state
    }
}