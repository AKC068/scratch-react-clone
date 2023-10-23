import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface ThinkProp {
  character: any;
  comp_id: string;
}

const ThinkMessage = (thinkProp: ThinkProp) => {
  const [state, setState] = useState({
    show_msg: false,
    message: "",
    character_id: "",
  });
  /* Display Think Message */
  const displayMessage = () => {
    const el = document.getElementById(
      `${thinkProp.character.active}-message-box`
    );
    const el2 = document.getElementById(
      `${thinkProp.character.active}-message-box1`
    );
    if (state.show_msg && state.character_id === thinkProp.character.active) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    window.clearTimeout(thinkProp.comp_id);
    el.innerHTML = state.message;
  };

  return (
    <Paper elevation={3} className="w-56">
      <div className="rounded text-center bg-purple-700 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Message</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.message}
            onChange={(e) => {
              e.target.value.length > 0 &&
                setState({ ...state, message: e.target.value });
            }}
          />
        </div>
        <div
          id={thinkProp.comp_id}
          className="flex text-center flex-row flex-wrap bg-purple-900 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => displayMessage()}
        >
          {`Think ${state.message}`}
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

export default connect(mapStateToProps)(ThinkMessage);
