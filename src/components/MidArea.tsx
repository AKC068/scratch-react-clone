import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import { updateList } from "redux/midarea/actions";
import {
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { purple } from "@material-ui/core/colors";

// Styling for MaterialUI Components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: 0,
    },
  })
);

// Customized button for Running Lists
const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    fontSize: "13px",
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
});

const RunButton = withStyles(styles)(Button);

interface MidAreaProp {
  area_list: any;
  event_values: any;
  key_pressed: any;
  set_list: (id: any, new_list: any) => void;
}

// Mid Area Component
const MidArea = (midAreaProp: MidAreaProp) => {
  const classes = useStyles();
  const eventFire = (el, etype) => {
    if (el && el.fireEvent) {
      el.fireEvent("on" + etype);
    } else if (el) {
      var evObj = document.createEvent("Events");
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  };

  // Define a state variable to keep track of the lists
  const [lists, setLists] = useState(midAreaProp.area_list.midAreaLists);

  // Handle reset of the list
  const resetMidArea = (id) => {
    const newComps = ["MOVE"];
    midAreaProp.set_list(id, newComps);

    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, comps: newComps };
      }
      return list;
    });

    setLists(updatedLists);
  };

  // Handle Running the list
  const handleClick = (arr, id) => {
    if (arr.length === 0) return;

    // Update the comps property for the specific list
    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, comps: arr };
      }
      return list;
    });
    setLists(updatedLists);
    // Dispatch the updateList action to update the Redux state
    midAreaProp.set_list(id, arr);

    let i = 0;

    let repeat = 1;

    let str1 = `comp${arr[i]}-${id}-${i}`;

    // Handle Wait at first index
    if (arr[i] === "WAIT") {
      let str2 = `comp${arr[i]}-${id}-${i}`;
      let last_time = new Date().getTime();
      let curr_time = new Date().getTime();

      while (
        (curr_time - last_time) / 1000 <
        midAreaProp.event_values.wait[str2] - 2
      ) {
        curr_time = new Date().getTime();
      }
    }

    // Handle Repeat at first index
    else if (arr[i] !== "REPEAT") {
      eventFire(document.getElementById(str1), "click");
    } else {
      repeat = midAreaProp.event_values.repeat[str1] + 1;
    }
    i++;

    /* Each function execution takes 2 seconds */
    var cnt = setInterval(() => {
      if (i === arr.length) {
        clearInterval(cnt);
      }

      // Handle Wait
      if (arr[i] === "WAIT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        let last_time = new Date().getTime();
        let curr_time = new Date().getTime();

        while (
          (curr_time - last_time) / 1000 <
          midAreaProp.event_values.wait[str2] - 2
        ) {
          curr_time = new Date().getTime();
        }
        i++;
      }
      // Handle Repeat Component at current index
      else if (arr[i] === "REPEAT") {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        repeat = repeat * (midAreaProp.event_values.repeat[str2] + 1);
        i++;
      }
      // If Repeat component is at previous index
      else if (arr[i - 1] === "REPEAT" && repeat > 2) {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        repeat--;
      } else {
        let str2 = `comp${arr[i]}-${id}-${i}`;
        eventFire(document.getElementById(str2), "click");
        i++;
      }
    }, 2000);
  };

  useEffect(() => {
    // automatically click the "Run" button when a key is pressed
    if (midAreaProp.key_pressed) {
      const id = lists[0].id;
      handleClick(lists[0].comps, id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [midAreaProp.key_pressed]);

  return (
    <div className="flex-1 h-full overflow-auto p-3">
      <div className="flex justify-between">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-yellow-400 p-2 w-auto">
          Mid Area
        </div>

        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<PlayArrowIcon />}
            onClick={() => resetMidArea(lists[0].id)}
          >
            Reset{" "}
          </Button>
        </div>
      </div>
      <div className="h-full grid grid-flow-col">
        {lists.map((l) => {
          return (
            <div className="h-full" key={l.id}>
              <Droppable droppableId={l.id} type="COMPONENTS">
                {(provided) => {
                  return (
                    <ul
                      className={`${l.id} h-full`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <div className="text-center mx-auto my-2 mb-4">
                        <RunButton
                          variant="contained"
                          className={classes.button}
                          startIcon={<PlayArrowIcon />}
                          onClick={() => handleClick(l.comps, l.id)}
                        >
                          Run{" "}
                        </RunButton>
                      </div>
                      {l.comps &&
                        l.comps.map((x, i) => {
                          let str = `${x}`;
                          let component_id = `comp${str}-${l.id}-${i}`;

                          return (
                            <Draggable
                              key={`${str}-${l.id}-${i}`}
                              draggableId={`${str}-${l.id}-${i}`}
                              index={i}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {getComponent(str, component_id)}
                                  {/* {provided.placeholder} */}
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </ul>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// mapping state to props
const mapStateToProps = (state) => {
  return {
    area_list: state.list,
    event_values: state.event,
    key_pressed: state.keyReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      set_list: updateList,
    },
    dispatch
  );
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(MidArea);
