import { DeleteIcon, EditIcon, InfoIcon } from '@/components/base/icons';
import { List } from '@/components/List';

interface MockData {
  id: number;
  name: string;
  age: number;
}

const mockData: MockData[] = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Jane', age: 21 },
  { id: 3, name: 'Jim', age: 22 },
];

export function Home() {
  const getSwipeLeftActions = (item: MockData) => [
    {
      icon: <EditIcon />,
      background: '#6d9ce8',
      color: 'var(--color-white)',
      onClick: () => {
        alert(`edit ${item.name}`);
      },
    },
    {
      icon: <DeleteIcon />,
      background: '#CA7373',
      onClick: () => {
        alert(`delete ${item.name}`);
      },
    },
  ];

  const getSwipeRightActions = (item: MockData) => [
    {
      icon: <InfoIcon />,
      background: '#6fcf64',
      onClick: () => {
        alert(`info ${item.name}`);
      },
    },
  ];

  return (
    <List
      data={mockData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => <div>{item.name}</div>}
      swipeLeftActions={getSwipeLeftActions}
      swipeRightActions={getSwipeRightActions}
    />
  );
}
