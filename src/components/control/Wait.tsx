import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWait } from "../../redux/events/eventActions";
import Paper from "@material-ui/core/Paper";

interface WaitProp {
  comp_id: string;
  events: any;
  set_wait: (value: number) => void;
}

const Wait = (waitProp: WaitProp) => {
  const [wait, setStateWait] = useState(0);

  // Set Wait value for current component
  const handleChange = (e) => {
    let val = parseInt(e.target.value);
    setStateWait(val);
    let curr = waitProp.events.wait;
    curr[waitProp.comp_id] = val;
    waitProp.set_wait(curr);
  };
  return (
    // Wait Component
    <Paper elevation={3} className="w-56">
      <div className=" text-center rounded bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Wait</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={wait}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div
          id={waitProp.comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Wait {wait} seconds
        </div>
      </div>
    </Paper>
  );
};

// map state to component
const mapStateToProps = (state) => {
  return {
    events: state.event,
  };
};

// map function to component
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      set_wait: setWait,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Wait);
