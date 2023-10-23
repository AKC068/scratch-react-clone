import { KEY_PRESSED } from "./keyTypes";

// Define the initial state
const initialState = {
  keyPressed: false, // Indicates whether the key is pressed or not
  pressedKey: "", // Stores the pressed key for reference
};

// Create your reducer function
export const keyPressReducer = (state = initialState, action) => {
  switch (action.type) {
    case KEY_PRESSED:
      return {
        keyPressed: true,
        pressedKey: action.key, // Store the pressed key
      };
    default:
      return state;
  }
};
