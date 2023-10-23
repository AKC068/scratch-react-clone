import React, { useState, useEffect } from "react";
import CatSprite from "./CatSprite";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addCharacter,
  setActive,
  removeCharacter,
} from "../redux/character/actions";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

// Styling for MaterialUI Components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: 2,
    },
  })
);

interface PreviewProp {
  character: any;
  set_active: (value: any) => void;
  add_character: () => void;
  remove_character: () => void;
}

const PreviewArea = (previewProp: PreviewProp) => {
  const classes = useStyles();
  const [active, setActive] = useState(previewProp.character.active);
  const [charac, setCharac] = useState(previewProp.character.characters);

  useEffect(() => {
    setActive(previewProp.character.active);
    setCharac(previewProp.character.characters);
  }, [previewProp.character]);

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let elmnt = null;

  const dragMouseDown = (e, id) => {
    elmnt = document.getElementById(id);

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  };

  const closeDragElement = () => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const handleChange = (e) => {
    setActive(e.target.value);
    previewProp.set_active(e.target.value);
  };

  return (
    <div
      className="w-full flex-none h-full overflow-y-auto p-3"
      id="preview_area"
    >
      <div className="flex justify-between mb-10">
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-yellow-400 p-2 w-auto">
          Preview Area
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Active
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={active}
              onChange={(e) => handleChange(e)}
              displayEmpty
              className={classes.selectEmpty}
            >
              {charac.map((x, i) => {
                const first = x.id.charAt(0).toUpperCase();
                const name = first + x.id.substr(1);

                return (
                  <MenuItem key={i} value={x.id}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={() => previewProp.add_character()}
          >
            Add{" "}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={`${classes.button}`}
            startIcon={<RemoveCircleIcon />}
            onClick={() => previewProp.remove_character()}
          >
            Remove{" "}
          </Button>
        </div>
      </div>
      <div className="flex justify-around h-full">
        {charac.map((x, i) => {
          return (
            <div
              id={`${x.id}-${i}`}
              key={i}
              className={`absolute`}
              onMouseDown={(e) => dragMouseDown(e, `${x.id}-${i}`)}
            >
              <div id={`${x.id}-div`} className="character">
                <div
                  className="hidden border-2 p-2 ml-3 mb-2 w-auto whitespace-nowrap"
                  id={x.id + "-message-box"}
                ></div>
                <div
                  className="hidden rounded-full border-2 w-4 left-1/2 h-4 ml-3 mb-2 whitespace-nowrap"
                  id={x.id + "-message-box1"}
                ></div>
                <CatSprite charac_id={x.id} />
              </div>
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
    character: state.character,
  };
};

// mapping functions to components
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      add_character: addCharacter,
      set_active: setActive,
      remove_character: removeCharacter,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewArea);
