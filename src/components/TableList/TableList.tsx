import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTables } from "../../store";
import { ITableType } from "../../types/index.type";

const viewbox8: string = "0 0 2240 1340";
const viewbox6: string = "0 0 1680 1184";

interface ITableListProps {
  id: number;
}

export const TableList: React.FC<ITableListProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((state) => state.tables);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const filteredTables = tables.filter((table) => table.restaurant === id);

  console.log(filteredTables);

  return (
    <div>
      <svg viewBox={id === 8 ? viewbox8 : viewbox6}>
        {filteredTables &&
          filteredTables.map((table) => <Table key={table.id} table={table} />)}
      </svg>
    </div>
  );
};

interface ITableProps {
  table: ITableType;
}

export const Table: React.FC<ITableProps> = ({ table }) => {
  if (!table.d) {
    console.error("Invalid or missing path data (table.d)");
    return null;
  }

  return (
    <path
      style={table.is_reserved ? { fill: "red" } : { fill: "green" }}
      d={table.d}
    />
  );
};
