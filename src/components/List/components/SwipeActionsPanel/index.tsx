import { forwardRef } from 'react';
import { useListContext } from '../../context';
import { ObjectType } from '../../types';
import { SwipeAction } from '../SwipeAction';
import styles from './styles.module.css';

interface SwipeActionsPanelProps {
  show: boolean;
  itemData: ObjectType;
  index: number;
  swipePosition: 'left' | 'right';
}

export const SwipeActionsPanel = forwardRef<HTMLDivElement, SwipeActionsPanelProps>(
  ({ show, itemData, swipePosition }, ref) => {
    const { swipeLeftActions, swipeRightActions } = useListContext();

    return (
      <div ref={ref} className={`${styles['swipe-actions-panel']} ${show ? styles.show : ''} ${styles[swipePosition]}`}>
        {swipePosition === 'left' &&
          swipeLeftActions?.(itemData)?.map((props, index) => (
            <SwipeAction key={index} {...props} itemData={itemData} />
          ))}

        {swipePosition === 'right' &&
          swipeRightActions?.(itemData)?.map((props, index) => (
            <SwipeAction key={index} {...props} itemData={itemData} />
          ))}
      </div>
    );
  }
);
