import styled from 'styled-components';

export const GridCellStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  margin: 0, 5rem;
  box-shadow: 15px 15px 15px #888888;
  border: 1px solid #efe7da;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  cursor: pointer; ;
`;

export const GridRowStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const GridStyled = styled.div`
  padding: 1rem;
`;
