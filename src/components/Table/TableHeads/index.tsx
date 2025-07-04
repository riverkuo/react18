import { TableColumns } from '../types';

export const TableHeads = <T extends ObjectType>({ columns }: { columns: TableColumns<T> }) => {
  return (
    <tr>
      {columns.map((col) => {
        return <th key={col.key}>{col.header}</th>;
      })}
    </tr>
  );
};
