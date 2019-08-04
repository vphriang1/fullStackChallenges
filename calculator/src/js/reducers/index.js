import { ANS } from '../constants/action-types';

const initState = {
  results: [{ value: 'START' }]
};

export default function rootReducer(state = initState, action) {
  if (action.type == ANS) {
    return Object.assign({}, state, {
      results: state.results.concat(action.payload)
    });
  }
  return state;
}
