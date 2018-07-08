export default function data(state = [], action) {
    switch (action.type) {
        case 'UPDATE_DATA':
            return action.data
        default:
            return state
    }
}
