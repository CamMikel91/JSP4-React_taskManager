import React from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const TableBody = (props) => {
  const { data, columns, routeBase } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const history = useHistory();

  const handleRowClick = (item) => {
    history.push(`/${routeBase}/${item._id}`);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id} onClick={() => handleRowClick(item)}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
