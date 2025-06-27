import { useMemo, useRef } from 'react';
import { ListFooter } from './components/ListFooter';
import { ListItem } from './components/ListItem';
import { ListContext, ListContextType } from './context';
import styles from './styles.module.css';
import { FooterComponent, ObjectType, OnReachEnd, SwipeActions } from './types';

interface ListProps<T extends ObjectType> {
  data: Array<T>;
  keyExtractor: (item: T, index?: number) => string;
  renderItem: (item: T, index?: number) => React.ReactNode;
  swipeLeftActions?: SwipeActions<T>;
  swipeRightActions?: SwipeActions<T>;
  onReachEnd?: OnReachEnd;
  footerComponent?: FooterComponent;
}

export const List = <T extends ObjectType>({
  data,
  renderItem,
  keyExtractor,
  swipeLeftActions,
  swipeRightActions,
  onReachEnd,
  footerComponent,
}: ListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const keyList = data.map((item) => ({
    key: keyExtractor(item),
    value: item,
  }));

  const memoContextValue: ListContextType<T> = useMemo(
    () => ({
      swipeLeftActions,
      swipeRightActions,
    }),
    [swipeLeftActions, swipeRightActions]
  );

  return (
    <div className={styles['list-container']} ref={containerRef}>
      <ListContext.Provider value={memoContextValue}>
        {keyList.map(({ key, value }, index) => (
          <ListItem itemValue={value} index={index} key={key}>
            {renderItem(value, index)}
          </ListItem>
        ))}
      </ListContext.Provider>

      <ListFooter onReachEnd={onReachEnd} footerComponent={footerComponent} containerRef={containerRef} />
    </div>
  );
};
