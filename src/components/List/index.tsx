import React, { useCallback, useMemo, useRef } from 'react';
import { ListFooter } from './components/ListFooter';
import { useVirtualized } from './hooks/useVirtualized';
import styles from './styles.module.css';
import { FooterComponent, OnReachEnd } from './types';

interface BaseListProps<T extends ObjectType> {
  data: Array<T>;
  keyExtractor: (item: T, index?: number) => string;
  renderItem: (item: T, index: number) => React.ReactElement;
  onReachEnd?: OnReachEnd;
  footerComponent?: FooterComponent;
  listHeight?: number;
  itemHeight?: number;
  gap?: number;
}

interface ListProps<T extends ObjectType> extends BaseListProps<T> {
  buffer?: never;
  virtualize?: never;
}

interface VirtualizedListProps<T extends ObjectType> extends BaseListProps<T> {
  virtualize: boolean;
  buffer?: number;
}

type ListComponentProps<T extends ObjectType> = ListProps<T> | VirtualizedListProps<T>;

const ListComponent = <T extends ObjectType>({
  data,
  renderItem,
  keyExtractor,
  onReachEnd,
  footerComponent,
  listHeight = 500,
  itemHeight = 50,
  gap = 0,
  buffer,
  virtualize,
}: ListComponentProps<T>) => {
  const itemHeightWithGap = itemHeight + gap;

  const containerRef = useRef<HTMLDivElement>(null);

  const keyList = useMemo(
    () =>
      data.map((item) => ({
        key: keyExtractor(item),
        value: item,
      })),
    [data, keyExtractor]
  );

  const renderListItem = useCallback(
    (item: { key: string; value: T }, i: number) => {
      return (
        <div
          key={item.key}
          className={styles['list-item']}
          style={{
            top: i * itemHeightWithGap,
            height: itemHeight,
          }}
        >
          {renderItem(item.value, i)}
        </div>
      );
    },
    [itemHeightWithGap, itemHeight, renderItem]
  );

  const { virtualizedList, updateVirtualizedList, virtualizedInnerHeight } = useVirtualized({
    itemHeightWithGap,
    listHeight,
    buffer: buffer ?? 1,
    virtualize: virtualize ?? false,
    keyList,
    itemCount: data.length,
    renderListItem,
    gap,
  });

  const innerHeight = virtualize ? virtualizedInnerHeight : keyList.length * itemHeightWithGap;

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    if (virtualize) updateVirtualizedList(e.currentTarget);
  }

  function renderList() {
    if (virtualize) return virtualizedList;
    return keyList.map((item, i) => renderListItem(item, i));
  }

  return (
    <div
      className={styles['list-container-outer']}
      style={{ height: `${listHeight}px` }}
      ref={containerRef}
      onScroll={onScroll}
    >
      <div style={{ height: `${innerHeight}px` }}>{renderList()}</div>
      <ListFooter onReachEnd={onReachEnd} footerComponent={footerComponent} containerRef={containerRef} />
    </div>
  );
};

ListComponent.displayName = 'List';

export const List = React.memo(ListComponent) as typeof ListComponent;
