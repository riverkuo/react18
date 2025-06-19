import { ObjectType, SwipeAction as SwipeActionTypes } from '../../types';
import styles from './styles.module.css';

type SwipeActionProps = SwipeActionTypes<any> & {
  itemData: ObjectType;
};

export const SwipeAction: React.FC<SwipeActionProps> = ({
  label,
  background,
  onClick,
  disabled = false,
  itemData,
  color,
  icon,
}) => {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (disabled) return;
    onClick(itemData);
  }

  return (
    <div
      className={`${styles['swipe-action']} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      style={{ background, color }}
    >
      {icon}
      <p className={styles['swipe-action-label']}>{label}</p>
    </div>
  );
};
