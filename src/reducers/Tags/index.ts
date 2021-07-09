import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";
import { AnyAction } from "~types";

export type TagReducerState = {
  data: [];
  isLoading: boolean;
};

export const initialState: TagReducerState = {
  data: [],
  isLoading: true
};

/**
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {TagReducerState} TAGS state.
 */
const tagReducer = (
  state: TagReducerState = initialState,
  { payload, type }: AnyAction
): TagReducerState => {
  switch (type) {
    case HYDRATE: {
      return { ...state, ...payload.tags };
    }
    case constants.TAGS_RESET:
    case constants.TAGS_FETCH: {
      return initialState;
    }
    case constants.TAGS_SET_DATA: {
      return {
        ...state,
        data: payload,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default tagReducer;
