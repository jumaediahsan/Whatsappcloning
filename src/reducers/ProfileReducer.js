import {
  IMAGE_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
  avatarSource: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_PROFILE:
      return { ...state, avatarSource: action.payload };
    default:
      return state;
  }
};
