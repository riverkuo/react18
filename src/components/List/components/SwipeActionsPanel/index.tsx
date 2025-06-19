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

export const SwipeActionsPanel: React.FC<SwipeActionsPanelProps> = ({ show, itemData, swipePosition }) => {
  const { swipeLeftActions, swipeRightActions } = useListContext();

  return (
    <>
      {swipePosition === 'left' && (
        <div className={`${styles['swipe-actions-panel']} ${styles.left} ${show ? styles.show : ''}`}>
          {swipeLeftActions?.(itemData)?.map((props, index) => (
            <SwipeAction key={index} {...props} itemData={itemData} />
          ))}
        </div>
      )}

      {swipePosition === 'right' && (
        <div className={`${styles['swipe-actions-panel']} ${styles.right} ${show ? styles.show : ''}`}>
          {swipeRightActions?.(itemData)?.map((props, index) => (
            <SwipeAction key={index} {...props} itemData={itemData} />
          ))}
        </div>
      )}
    </>
  );
};
