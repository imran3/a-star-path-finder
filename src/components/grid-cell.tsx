import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faArrowDown,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import { GridCellStyled } from './styles';

let dirArrows = {
  left: <FontAwesomeIcon icon={faArrowLeft} />,
  right: <FontAwesomeIcon icon={faArrowRight} />,
  up: <FontAwesomeIcon icon={faArrowUp} />,
  down: <FontAwesomeIcon icon={faArrowDown} />,
};

export const GridCell = ({ cell, onClick }) => {
  let [directionArrow, setDirectionArrow] = useState(null);

  // display/clear direction arrows
  useEffect(() => {
    if (!cell.cameFrom) {
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
  }, [cell, cell.cameFrom]);

  return (
    <GridCellStyled
      onClick={onClick}
      style={{ background: cell?.bgColor ? cell.bgColor : 'purple' }}
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
