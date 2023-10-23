import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface SizeByPercentProp {
  character: any;
  comp_id: string;
}

const SizeByPercentage = (sizeByPercentProp: SizeByPercentProp) => {
  const [state, setState] = useState({
    scale: 100,
  });
  // To change Size by percentage of Sprint
  const changeSize = () => {
    const el = document.getElementById(sizeByPercentProp.character.active);
    el.style.transform = `scale(${state.scale / 100})`;
  };

  return (
    <Paper elevation={3} className="w-56">
      <div className="text-center rounded bg-purple-500 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Size by %:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.scale}
            onChange={(e) =>
              setState({ ...state, scale: parseInt(e.target.value) })
            }
          />
        </div>
        <div
          id={sizeByPercentProp.comp_id}
          className="text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeSize()}
        >
          Size {state.scale}%
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

export default connect(mapStateToProps)(SizeByPercentage);
