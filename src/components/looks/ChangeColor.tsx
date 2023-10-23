import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface ChangeColorProp {
  character: any;
  comp_id: string;
}

const ChangeColor = (changeColorProp: ChangeColorProp) => {
  const [state, setState] = useState({
    filter: "none", // Initial color
  });

  const handleFilterChange = (e) => {
    setState({ ...state, filter: e.target.value });
  };

  const handleColorApply = () => {
    const el = document.getElementById(changeColorProp.character.active);
    el.style.filter = state.filter;
  };

  return (
    <Paper elevation={3} className="w-56">
      <div className={"text-center rounded bg-purple-500 p-2 my-3"}>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Filter:</div>
          <select value={state.filter} onChange={handleFilterChange}>
            <option value="none">None</option>
            <option value="brightness(150%)">Brightness</option>
            <option value="opacity(0.5)">Ghost</option>
            <option value="url(#fisheye-filter)">Fisheye</option>
            <option value="whirl(180deg)">Whirl</option>
            <option value="url(#mosaic-filter)">Mosaic</option>
            <option value="url(#pixelate-filter)">Pixelate</option>
          </select>
        </div>
        <div id={changeColorProp.comp_id} onClick={handleColorApply}></div>
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

export default connect(mapStateToProps)(ChangeColor);
