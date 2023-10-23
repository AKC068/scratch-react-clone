import { KEY_PRESSED } from "./keyTypes";

export const keyPressed = (key_pressed) => {
  return { type: KEY_PRESSED, key: key_pressed };
};
