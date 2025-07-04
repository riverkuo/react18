import { TableColumns } from '@/components/Table/types';
import { FoodItem } from '@/service/food/types';
import { NameCell } from './NameCell';
import { ActionCell } from './ActionCell';

export function getColumns(): TableColumns<FoodItem> {
  const columns: TableColumns<FoodItem> = [
    {
      key: 'id',
      header: 'id',
    },
    {
      key: 'name',
      header: 'name',
      cell: (params) => <NameCell {...params} />,
    },
    { key: 'created_at', header: 'created_at' },
    {
      key: 'action',
      header: 'action',
      cell: ({ originValue }) => <ActionCell originValue={originValue} />,
    },
  ];

  return columns;
}
