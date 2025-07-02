import { ReactNode, useEffect, useState } from 'react';

interface UseVirtualizedProps<T extends ObjectType> {
  itemHeightWithGap: number;
  listHeight: number;
  buffer: number;
  virtualize: boolean;
  keyList: Array<{ key: string; value: T }>;
  itemCount: number;
  gap: number;
  renderListItem: (item: { key: string; value: T }, i: number) => ReactNode;
}

export const useVirtualized = <T extends ObjectType>({
  itemHeightWithGap,
  listHeight,
  buffer,
  virtualize,
  keyList,
  itemCount,
  gap,
  renderListItem,
}: UseVirtualizedProps<T>) => {
  const [virtualizedList, setVirtualizedList] = useState<Array<ReactNode>>([]);

  function updateVirtualizedList(target?: HTMLDivElement) {
    const scrollTop = target?.scrollTop ?? 0;
    const startIndex = Math.max(Math.floor(scrollTop / itemHeightWithGap) - buffer, -1);
    const endIndex = Math.min(Math.ceil((scrollTop + listHeight) / itemHeightWithGap) + buffer, itemCount);

    const tempList = [];

    for (let i = startIndex + 1; i < endIndex; i++) {
      const item = keyList[i];
      tempList.push(renderListItem(item, i));
    }

    setVirtualizedList(tempList);
  }

  useEffect(() => {
    if (virtualize) updateVirtualizedList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    updateVirtualizedList,
    virtualizedList,
    virtualizedInnerHeight: itemCount * itemHeightWithGap - gap,
  };
};
