import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getTables,
  setSelectedTableId,
  setTableId,
  setTableNumber,
} from "../../store";
import { ITableType } from "../../types/index.type";

interface ITableListProps {
  id: number;
  viewbox: string;
}

export const TableList: React.FC<ITableListProps> = ({ id, viewbox }) => {
  const dispatch = useAppDispatch();
  const { tables, selectedTableId } = useAppSelector((state) => state.tables);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const filteredTables = tables.filter((table: { restaurant: number; }) => table.restaurant === id);

  return (
    <div>
      <svg viewBox={viewbox}>
        {filteredTables &&
          filteredTables.map((table) => (
            <Table
              key={table.id}
              table={table}
              isSelected={table.id === selectedTableId}
            />
          ))}
      </svg>
    </div>
  );
};

interface ITableProps {
  table: ITableType;
  isSelected: boolean;
}

export const Table: React.FC<ITableProps> = ({ table, isSelected }) => {
  const dispatch = useAppDispatch();

  const setTableData = () => {
    dispatch(setTableId(Number(table.id)));
    dispatch(setTableNumber(Number(table.number)));
    dispatch(setSelectedTableId(Number(table.id)));
  };

  return (
    <path
      style={{
        fill: table.is_reserved ? "red" : "green",
        opacity: isSelected ? 0.6 : 1,
        pointerEvents: table.is_reserved ? "none" : "auto",
      }}
      onClick={setTableData}
      d={table.d}
    />
  );
};
