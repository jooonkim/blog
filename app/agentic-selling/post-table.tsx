export default function Table({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}) {
  return (
    <div className="post-table">
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th scope="col" key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                cellIndex === 0
                  ? <th scope="row" data-label={data.headers[cellIndex]} key={cellIndex}>{cell}</th>
                  : <td data-label={data.headers[cellIndex]} key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
