import { memo, useMemo, useRef } from 'react';
import { SwipeActions } from './components/SwipeActions';
import { useSwipe } from './hooks/useSwipe';
import { SwipeActionsType } from './types';
import styles from './styles.module.css';

interface SwipeActionPanelProps<T extends ObjectType> {
  swipeLeftActions?: SwipeActionsType<T>;
  swipeRightActions?: SwipeActionsType<T>;
  itemValue: T;
  index: number;
  children?: React.ReactNode;
}

const SwipeActionsPanelComponent = <T extends ObjectType>({
  swipeLeftActions,
  swipeRightActions,
  itemValue,
  index,
  children,
}: SwipeActionPanelProps<T>) => {
  const swipeWrapperRef = useRef<HTMLDivElement>(null);
  const swipeMethods = useSwipe({
    enabledSwipeLeft: !!swipeLeftActions,
    enabledSwipeRight: !!swipeRightActions,
    wrapperRef: swipeWrapperRef,
  });
  const stableChildren = useMemo(() => children, []);

  return (
    <div
      className={styles['item']}
      onTouchStart={swipeMethods.handleTouchStart}
      onTouchMove={swipeMethods.handleTouchMove}
      onTouchEnd={swipeMethods.handleTouchEnd}
      ref={swipeWrapperRef}
    >
      {!!swipeRightActions && (
        <SwipeActions
          show={swipeMethods.isSwipePanelOpen?.right ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="right"
          swipeActions={swipeRightActions}
        />
      )}

      <div
        onClickCapture={(e) => {
          swipeMethods.preventOutsideClickHandler?.(e);
        }}
      >
        {stableChildren}
      </div>

      {!!swipeLeftActions && (
        <SwipeActions
          show={swipeMethods.isSwipePanelOpen?.left ?? false}
          itemData={itemValue}
          index={index}
          swipePosition="left"
          swipeActions={swipeLeftActions}
        />
      )}
    </div>
  );
};

SwipeActionsPanelComponent.displayName = 'SwipeActionsPanel';

export const SwipeActionsPanel = memo(SwipeActionsPanelComponent) as typeof SwipeActionsPanelComponent;
