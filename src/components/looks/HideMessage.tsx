import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface HideMessageProp {
  character: any;
  comp_id: string;
}

const HideMessage = (hideMessageProp: HideMessageProp) => {
  /* Hide Message */
  const displayMessage = () => {
    window.clearTimeout(hideMessageProp.comp_id);
    const el = document.getElementById(
      `${hideMessageProp.character.active}-message-box`
    );
    const el2 = document.getElementById(
      `${hideMessageProp.character.active}-message-box1`
    );
    el.style.display = "none";
    el2.style.display = "none";
  };

  return (
    <Paper elevation={3} className="w-56">
      <div
        id={hideMessageProp.comp_id}
        onClick={() => displayMessage()}
        className="rounded bg-purple-700 text-center text-white max-w-content p-1 my-3"
      >
        Hide Message
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

export default connect(mapStateToProps)(HideMessage);
