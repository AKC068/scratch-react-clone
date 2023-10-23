import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRepeat } from "../../redux/events/eventActions";
import Paper from "@material-ui/core/Paper";

interface RepeatProp {
  comp_id: string;
  events: any;
  set_repeat: (value: number) => void;
}

const Repeat = (repeatProp: RepeatProp) => {
  const [stateRepeat, setStateRepeat] = useState(0);

  // Set Repeat value for current component
  const handleChange = (e) => {
    let val = parseInt(e.target.value);
    setStateRepeat(val);
    let curr = repeatProp.events.repeat;
    curr[repeatProp.comp_id] = val;
    repeatProp.set_repeat(curr);
  };

  return (
    // Repeat Component
    <Paper elevation={3} className="w-56">
      <div className="rounded text-center bg-red-400 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Repeat</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={stateRepeat}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div
          id={repeatProp.comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          Repeat By {stateRepeat}
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
      set_repeat: setRepeat,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Repeat);
