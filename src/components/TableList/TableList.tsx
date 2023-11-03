import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getTables, setTableId, setTableNumber } from "../../store";
import { ITableType } from "../../types/index.type";

interface ITableListProps {
  id: number;
  viewbox: string;
}

export const TableList: React.FC<ITableListProps> = ({ id, viewbox }) => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector((state) => state.tables);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const filteredTables = tables.filter((table) => table.restaurant === id);

  return (
    <div>
      <svg viewBox={viewbox}>
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
  const dispatch = useAppDispatch();

  const setTableData = () => {
    dispatch(setTableId(Number(table.id)))
    dispatch(setTableNumber(Number(table.number)))
  }

  return (
    <path
      style={table.is_reserved ? { fill: "red" } : { fill: "green" }}
      onClick={setTableData}
      d={table.d}
    />
  );
};
