export const PrettyGrid = ({ grid }) => {
  return (
    <div className="prettyGridTable">
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr className="tableRow" key={rowIndex + 10}>
              {row.map((cell, sIndex) => {
                return (
                  <td
                    key={rowIndex + '-' + sIndex}
                    align="center"
                    className="tableCell"
                    style={{
                      background: cell.color,
                      border: '5px solid red',
                    }}
                  >
                    {cell.color}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
