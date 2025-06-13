import { createContext, useContext } from 'react';
import { SwipeActions, ObjectType, } from './types';

export interface ListContextType<T extends ObjectType > {
  swipeLeftActions?: SwipeActions<T>;
  swipeRightActions?: SwipeActions<T>;
  keyList: Array<{
    key: string;
    value: T;
  }>;
}


export const ListContext = createContext<ListContextType<any> | null>(null);

export function useListContext() {

  const listContextData = useContext(ListContext);

  if (!listContextData) {
    throw new Error('useListContext must be used within a ListContextProvider');
  }

  return listContextData;
}
