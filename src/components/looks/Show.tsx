import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface ShowProp {
  character: any;
  comp_id: string;
}

const Show = (showProp: ShowProp) => {
  // To handle show component
  const handleDisplay = () => {
    const el = document.getElementById(showProp.character.active);
    el.style.display = "inline-block";
  };

  return (
    <Paper elevation={3} className="w-56">
      <div
        id={showProp.comp_id}
        className="rounded text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        Show
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

export default connect(mapStateToProps)(Show);
