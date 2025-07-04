import { memo } from 'react';
import { TableHeads } from './TableHeads';
import { TableRow } from './TableRow';
import { TableColumns } from './types';

interface TableProps<T extends ObjectType> {
  data: Array<T> | null | undefined;
  columns: TableColumns<T>;
  isLoading?: boolean;
  noDataText?: string;
  getRowId?: (data: T) => React.Key;
}

const TableComponent = <T extends ObjectType>({
  columns,
  data,
  isLoading,
  noDataText = '無資料',
  getRowId,
}: TableProps<T>) => {
  return (
    <table>
      <tbody>
        <TableHeads columns={columns} />
        {!data ? (
          <tr>
            <td>{noDataText}</td>
          </tr>
        ) : isLoading ? (
          <tr>
            <td>loading...</td>
          </tr>
        ) : (
          data.map((rowData, index) => (
            <TableRow rowData={rowData} key={getRowId?.(rowData) ?? index} columns={columns} />
          ))
        )}
      </tbody>
    </table>
  );
};

TableComponent.displayName = 'TableRow';

export const Table = memo(TableComponent) as typeof TableComponent;
