import React, { memo, useRef } from 'react';
import { useListContext } from '../../context';
import { useSwipe } from '../../hooks/useSwipe';
import { ObjectType } from '../../types';
import { SwipeActionsPanel } from '../SwipeActionsPanel';
import styles from './styles.module.css';

interface ListItemProps<T extends ObjectType> {
  itemValue: T;
  index: number;
  children: React.ReactNode;
}

export const ListItem = memo(<T extends ObjectType>({ itemValue, index, children }: ListItemProps<T>) => {
  const { swipeLeftActions, swipeRightActions } = useListContext();

  const swipeWrapperRef = useRef<HTMLDivElement>(null);
  const swipeMethods = useSwipe({
    enabledSwipeLeft: !!swipeLeftActions,
    enabledSwipeRight: !!swipeRightActions,
    wrapperRef: swipeWrapperRef,
  });

  return (
    <div
      className={styles['list-item']}
      onTouchStart={swipeMethods.handleTouchStart}
      onTouchMove={swipeMethods.handleTouchMove}
      onTouchEnd={swipeMethods.handleTouchEnd}
      ref={swipeWrapperRef}
    >
      {!!swipeRightActions && (
        <SwipeActionsPanel
          show={swipeMethods.isSwipePanelOpen?.right ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="right"
        />
      )}

      <div
        className={styles['list-item-content']}
        onClickCapture={(e) => {
          swipeMethods.preventOutsideClickHandler?.(e);
        }}
      >
        {children}
      </div>

      {!!swipeLeftActions && (
        <SwipeActionsPanel
          show={swipeMethods.isSwipePanelOpen?.left ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="left"
        />
      )}
    </div>
  );
});

ListItem.displayName = 'ListItem';
