import { useEffect, useState } from 'react';
import { GridCellStyled } from './styles';

export const GridCell = ({ cell, onClick }) => {
  let [directionArrow, setDirectionArrow] = useState(null);
  let dirArrows = {
    left: '←',
    right: '→',
    up: '↑',
    down: '↓',
  };

  // display/clear direction arrows
  useEffect(() => {
    if (!cell.cameFrom) {
      setDirectionArrow(null);
      return;
    }

    let cm = cell.cameFrom;
    if (cm) {
      let arrow = '';

      let [cmX, cmY] = [...cm.split('-')];
      cmX = parseInt(cmX, 10);
      cmY = parseInt(cmY, 10);
      if (cell?.x === cmX) {
        arrow = cell?.y > cmY ? dirArrows.left : dirArrows.right;
        setDirectionArrow(arrow);
      }

      if (cell.y === cmY) {
        arrow = cell?.x > cmX ? dirArrows.up : dirArrows.down;
        setDirectionArrow(arrow);
      }
    }
  }, [cell, cell.cameFrom]);

  return (
    <GridCellStyled
      onClick={onClick}
      style={{ background: cell?.bgColor ? cell.bgColor : 'purple' }}
    >
      <div>{directionArrow ? directionArrow : '*'}</div>
      {/* <div>
        {cell.x} - {cell.y}
      </div>
      <div>{cell.status}</div>
      <div>{cell.cameFrom}</div> */}
    </GridCellStyled>
  );
};
