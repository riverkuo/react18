import { List } from '@/components/List';

const mockData = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Jane', age: 21 },
  { id: 3, name: 'Jim', age: 22 },
];

export function Home() {
  return (
    <List
      data={mockData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(item) => <div>{item.name}</div>}
      swipeLeftActions={(item) => [
        {
          label: 'edit',
          background: '#6d9ce8',
          onClick: () => {
            alert(`edit ${item.name}`);
          },
        },
        {
          label: 'delete',
          background: '#CA7373',
          onClick: () => {
            alert(`delete ${item.name}`);
          },
        },
      ]}
      swipeRightActions={(item) => [
        {
          label: 'info',
          background: '#6fcf64',
          onClick: () => {
            alert(`info ${item.name}`);
          },
        },
      ]}
    />
  );
}
