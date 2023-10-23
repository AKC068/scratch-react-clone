import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface HideProp {
  character: any;
  comp_id: string;
}

const Hide = (hideProp: HideProp) => {
  // To handle hide component
  const handleDisplay = () => {
    const el = document.getElementById(hideProp.character.active);
    el.style.display = "none";
  };

  return (
    <Paper elevation={3} className="w-56">
      <div
        id={hideProp.comp_id}
        className="text-center rounded bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        Hide
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

export default connect(mapStateToProps)(Hide);
