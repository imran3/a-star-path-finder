import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import { GridCellStyled } from './styles';
import { colors } from '../App';

let dirArrows = {
  left: <FontAwesomeIcon icon={faArrowLeft} />,
  right: <FontAwesomeIcon icon={faArrowRight} />,
  up: <FontAwesomeIcon icon={faArrowUp} />,
  down: <FontAwesomeIcon icon={faArrowDown} />,
};

export const GridCell = ({ cell, startCell, goalCell, onClick }) => {
  let [directionArrow, setDirectionArrow] = useState(null);
  let [bgHoverColor, setBgHoverColor] = useState('');

  // display/clear direction arrows
  useEffect(() => {
    // remove arrow if no path to display
    if (!cell.cameFrom) {
      setDirectionArrow(null);
      return;
    }

    // no arrow for goal cell
    if (cell.x === goalCell.x && cell.y === goalCell.y) {
      setDirectionArrow(null);
      return;
    }

    if (cell.cameFrom) {
      let arrow = null;

      let [cfX, cfY] = [...cell.cameFrom.split('-')];
      cfX = parseInt(cfX, 10);
      cfY = parseInt(cfY, 10);

      if (cell.x === cfX)
        arrow = cell.y > cfY ? dirArrows.right : dirArrows.left;

      if (cell.y === cfY) arrow = cell.x > cfX ? dirArrows.down : dirArrows.up;

      setDirectionArrow(arrow);
    }
  }, [cell, cell.cameFrom, goalCell]);

  const setHoverBgColor = () => {
    if (startCell && goalCell) return setBgHoverColor(colors.mouseHoverCell);

    if (!startCell) return setBgHoverColor(colors.startCell);

    if (startCell && !goalCell) return setBgHoverColor(colors.goalCell);
  };

  const removeHoverBgColor = () => {
    setBgHoverColor(null);
  };

  return (
    <GridCellStyled
      onClick={onClick}
      style={{
        background: bgHoverColor
          ? bgHoverColor
          : cell?.bgColor
          ? cell.bgColor
          : 'purple',
      }}
      onMouseEnter={() => setHoverBgColor()}
      onMouseLeave={() => removeHoverBgColor()}
    >
      <div>{directionArrow ? directionArrow : ''}</div>
      {/* <div>
        {cell.x} - {cell.y}
      </div>
      <div>{cell.status}</div>
      <div>{cell.cameFrom}</div> */}
    </GridCellStyled>
  );
};
