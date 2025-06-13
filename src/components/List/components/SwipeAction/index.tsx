import { ObjectType, SwipeAction as SwipeActionTypes } from '../../types';
import styles from '../SwipeActionsPanel/styles.module.css';

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
  return (
    <div
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      key={label}
      onClick={(e) => {
        e.stopPropagation();
        if (disabled) return;

        onClick(itemData);
      }}
      style={{ background, color }}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};
