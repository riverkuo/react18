import { ReactNode } from 'react';

export interface SwipeAction<T extends ObjectType> {
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  background: string;
  color?: string;
  onClick: (item: T) => void;
}

export type SwipeActions<T extends ObjectType> = (item: T) => Array<SwipeAction<T>>;

export type ObjectType = Record<string, any>;
