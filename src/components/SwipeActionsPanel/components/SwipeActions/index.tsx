import styles from './styles.module.css';
import { SwipeActionsType as SwipeActionsTypes } from '../../types';
import { SwipeAction } from '../SwipeAction';

interface SwipeActionsProps<T extends ObjectType> {
  show: boolean;
  itemData: T;
  index: number;
  swipePosition: 'left' | 'right';
  swipeActions: SwipeActionsTypes<T>;
}

export const SwipeActions = <T extends ObjectType>({
  show,
  itemData,
  swipePosition,
  swipeActions,
}: SwipeActionsProps<T>) => {
  const positionClass = swipePosition === 'left' ? styles.left : styles.right;
  return (
    <div className={`${styles['swipe-actions']} ${positionClass} ${show ? styles.show : ''}`}>
      {swipeActions(itemData)?.map((props, index) => (
        <SwipeAction key={index} itemData={itemData} {...props} />
      ))}
    </div>
  );
};
