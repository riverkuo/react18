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
  { id: 4, name: 'Jill', age: 23 },
  { id: 5, name: 'Jack', age: 24 },
  { id: 6, name: 'Jill', age: 25 },
  { id: 7, name: 'Jack', age: 26 },
  { id: 8, name: 'Jill', age: 27 },
  { id: 9, name: 'Jack', age: 28 },
  { id: 10, name: 'Jill', age: 29 },
  { id: 11, name: 'Jack', age: 30 },
  { id: 12, name: 'Jill', age: 31 },
  { id: 13, name: 'Jack', age: 32 },
  { id: 14, name: 'Jill', age: 33 },
  { id: 15, name: 'Jack', age: 34 },
  { id: 16, name: 'Jill', age: 35 },
  { id: 17, name: 'Jack', age: 36 },
  { id: 18, name: 'Jill', age: 37 },
  { id: 19, name: 'Jack', age: 38 },
  { id: 20, name: 'Jill', age: 39 },
  { id: 21, name: 'Jack', age: 40 },
  { id: 22, name: 'Jill', age: 41 },
  { id: 23, name: 'Jack', age: 42 },
  { id: 24, name: 'Jill', age: 43 },
];

const Home = () => {
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
};

export default Home;
