import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { keyPressed } from "redux/keyPressed/keyActions";
import Paper from "@material-ui/core/Paper";

interface PressKeyProp {
  key_pressed: any;
  comp_id: string;
}

const PressKey = (pressKeyProp: PressKeyProp) => {
  const [state, setState] = useState({
    key: "",
  });

  const selectRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === state.key) {
        // Perform the desired action here
        console.log(`Key "${e.key}" pressed!`);
        pressKeyProp.key_pressed(state.key);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressKeyProp.key_pressed, state.key]);

  const handleChange = (e) => {
    setState({ ...state, key: e.target.value });
  };

  return (
    <Paper elevation={3} className="w-56">
      <div className="rounded text-center bg-yellow-400 p-2 my-3">
        <div id={pressKeyProp.comp_id} className="grid grid-cols-2 my-2">
          <div className="text-white">Press Key:</div>
          <select
            ref={selectRef}
            value={state.key}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select a key</option>
            <option value="ArrowUp">Arrow Up</option>
            <option value="ArrowDown">Arrow Down</option>
            <option value="ArrowLeft">Arrow Left</option>
            <option value="ArrowRight">Arrow Right</option>
            {/* Add more options for other keys */}
          </select>
        </div>
      </div>
    </Paper>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    key_pressed: (key) => dispatch(keyPressed(key)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(PressKey);
