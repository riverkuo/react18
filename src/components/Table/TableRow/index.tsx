import { memo } from 'react';
import { TableColumns } from '../types';

interface TableRowProps<T extends ObjectType> {
  rowData: T;
  columns: TableColumns<T>;
}

const TableRowComponent = <T extends ObjectType>({ rowData, columns }: TableRowProps<T>) => {
  return (
    <tr>
      {columns.map((col) => {
        return (
          <td key={col.key}>
            {col.cell ? col.cell?.({ value: rowData?.[col.key], originValue: rowData }) : rowData?.[col.key]}
          </td>
        );
      })}
    </tr>
  );
};

TableRowComponent.displayName = 'TableRow';

export const TableRow = memo(TableRowComponent) as typeof TableRowComponent;
