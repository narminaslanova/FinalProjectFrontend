import { SET_USER, UPDATE_CONTACTINFO } from "../actions/actionType";

const INITAL_STATE = {
  user: null,
  contactInfo: [],
};

const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_CONTACTINFO:
      return {
        ...state,
        contactInfo: action.contactInfo,
      };
    default:
      return state;
  }
};

export default userReducer;
//all reducer does is update a given state
