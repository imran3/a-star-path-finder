import React from 'react';
import { GridCellStyled } from './styles';

export const GridCell = ({ cell, onClick }) => {
  return (
    <GridCellStyled
      onClick={onClick}
      style={{ background: cell?.bgColor ? cell.bgColor : 'purple' }}
    >
      <div>
        {cell.x} - {cell.y}
      </div>
      <div>{cell.status}</div>
      <div>{cell.cameFrom}</div>
    </GridCellStyled>
  );
};
