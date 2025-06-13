import { ReactNode, useMemo, useRef } from 'react';
import { SwipeActionsPanel } from './components/SwipeActionsPanel';
import { ListContext, ListContextType, useListContext } from './context';
import { useSwipe } from './hooks/useSwipe';
import { SwipeActions, ObjectType } from './types';
import styles from './styles.module.css';

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
  const keyList = useMemo(
    () =>
      data.map((item) => ({
        key: keyExtractor(item),
        value: item,
      })),
    [data, keyExtractor]
  );

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
            {renderItem?.(value, index) ?? value.toString()}
          </ListItem>
        ))}
      </div>
    </ListContext.Provider>
  );
};

interface ListItemProps {
  itemValue: ObjectType;
  index: number;
  children: ReactNode;
}
const ListItem: React.FC<ListItemProps> = ({ itemValue, index, children }) => {
  const { swipeLeftActions, swipeRightActions } = useListContext();

  const swipeWrapperRef = useRef<HTMLDivElement>(null);
  const { handleTouchStart, handleTouchMove, handleTouchEnd, preventOutsideClickHandler, isSwipePanelOpen } = useSwipe({
    enabledSwipeLeft: !!swipeLeftActions,
    enabledSwipeRight: !!swipeRightActions,
    wrapperRef: swipeWrapperRef,
  });

  return (
    <div
      className={styles['list-item']}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={swipeWrapperRef}
    >
      {!!swipeRightActions && (
        <SwipeActionsPanel
          show={isSwipePanelOpen?.right ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="right"
        />
      )}

      <div
        className={styles['list-item-content']}
        onClickCapture={(e) => {
          preventOutsideClickHandler?.(e);
        }}
      >
        {children}
      </div>

      {!!swipeLeftActions && (
        <SwipeActionsPanel
          show={isSwipePanelOpen?.left ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="left"
        />
      )}
    </div>
  );
};
