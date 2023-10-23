import { SET_LIST } from "./types";

const initialState = {
  midAreaLists: [
    {
      id: "midAreaList-0",
      comps: ["MOVE"],
    },
  ],
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      const updatedMidAreaLists = state.midAreaLists.map((list) => {
        if (list.id === action.id) {
          return { ...list, comps: action.list };
        }
        return list;
      });

      return {
        ...state,
        midAreaLists: updatedMidAreaLists,
      };

    default:
      return state;
  }
};
