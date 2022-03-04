import { Button } from 'react-bootstrap';

export const Controls = ({ onResetClickHandler }) => {
  return (
    <div
      style={{
        margin: '1rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="controls"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {/* TODO: implemet step by step path finding */}
        {/* <Button onClick={() => engine.takeStep()}>Take Step</Button> */}

        <Button onClick={onResetClickHandler} variant="danger">
          Reset
        </Button>
      </div>
    </div>
  );
};
