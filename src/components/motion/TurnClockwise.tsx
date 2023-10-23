import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import RedoIcon from "@material-ui/icons/Redo";
import Paper from "@material-ui/core/Paper";

interface TurnClockWiseProp {
  character: any;
  characterAngle: (angle: number) => void;
  comp_id: string;
}

const TurnClockWise = (turnClockWiseProp: TurnClockWiseProp) => {
  const [angle, setAngle] = useState(0);

  // handle turn clockwise component
  const handleClick = () => {
    const el = document.getElementById(turnClockWiseProp.character.active);
    const character_angle = turnClockWiseProp.character.characters.find(
      (x) => x.id === turnClockWiseProp.character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + angle}deg)`;
      turnClockWiseProp.characterAngle(character_angle.angle + angle);
    }
  };

  return (
    <Paper elevation={3} className="w-56">
      <div className="text-center rounded bg-blue-500 p-2 my-3">
        <div className="grid grid-cols-2">
          <div className="text-white">Rotate By:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
        </div>
        <div
          id={turnClockWiseProp.comp_id}
          className={`flex bg-blue-700 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center`}
          onClick={() => handleClick()}
        >
          <div className="flex mx-auto">
            Turn
            <RedoIcon className="mx-2" /> {angle} degrees
          </div>
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

// mapping function to component
const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnClockWise);
