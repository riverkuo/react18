import { ListItem } from './components/ListItem';
import { ListContext, ListContextType } from './context';
import styles from './styles.module.css';
import { ObjectType, SwipeActions } from './types';

interface ListProps<T extends ObjectType> {
  data: Array<T>;
  keyExtractor: (item: T) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  swipeLeftActions?: SwipeActions<T>;
  swipeRightActions?: SwipeActions<T>;
}

export const List = <T extends ObjectType>({
  data,
  renderItem,
  keyExtractor,
  swipeLeftActions,
  swipeRightActions,
}: ListProps<T>) => {
  const keyList = data.map((item) => ({
    key: keyExtractor(item),
    value: item,
  }));

  const contextValue: ListContextType<T> = {
    swipeLeftActions,
    swipeRightActions,
    keyList,
  };

  return (
    <ListContext.Provider value={contextValue}>
      <div className={styles['list-container']}>
        {keyList.map(({ key, value }, index) => (
          <ListItem itemValue={value} index={index} key={key}>
            {renderItem(value, index)}
          </ListItem>
        ))}
      </div>
    </ListContext.Provider>
  );
};
