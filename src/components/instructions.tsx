export const Instructions = ({ startCell, goalCell }) => {
  return (
    <h3>
      {' '}
      {!startCell ? (
        <p>Click on START cell</p>
      ) : !goalCell ? (
        <p>Click on GOAL cell</p>
      ) : (
        <p> Click to reset grid</p>
      )}
    </h3>
  );
};
