import { ReactNode } from 'react';

export interface SwipeActionType<T extends ObjectType> {
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  background: string;
  color?: string;
  onClick: (item: T) => void;
}

export type SwipeActionsType<T extends ObjectType> = (item: T) => Array<SwipeActionType<T>>;
