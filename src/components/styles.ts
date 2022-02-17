import styled from 'styled-components';

export const GridStyled = styled.div`
  padding: 1rem;
`;

export const GridRowStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const GridCellStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  margin: 0, 5rem;
  padding: 0.5rem;
  border: 1px solid blue;
  cursor: pointer;
  background: ${props => (props.bgColor ? props.bgColor : 'yellow')};
`;
