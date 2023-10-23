import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

interface MoveYProp {
  character: any;
  comp_id: string;
}

// Move Component for Sidebar
const MoveY = (moveYProp: MoveYProp) => {
  const [steps, setSteps] = useState(0);

  // Function used for moiving Sprint in Y direction
  const handleClick = () => {
    const el = document.getElementById(`${moveYProp.character.active}-div`);

    var top = el.offsetTop;
    el.style.position = "relative";
    el.style.top = top + steps + "px";
  };

  return (
    <Paper elevation={3} className="w-56">
      <div
        id={moveYProp.comp_id}
        className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
        onClick={() => handleClick()}
      >
        Move Y{" "}
        <input
          type="number"
          className="text-black text-center w-16 mx-2"
          value={steps}
          onChange={(e) => setSteps(parseInt(e.target.value))}
        />{" "}
        steps
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

export default connect(mapStateToProps)(MoveY);
