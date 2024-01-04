import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data, routeBase }) => {
  return (
    <table className="table table-dark table-hover">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} routeBase={routeBase} />
    </table>
  );
};

export default Table;
