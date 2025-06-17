import { useEffect, useRef, useState } from 'react';

interface SwipeState {
  startX: number;
  endX: number;
}

interface UseSwipeProps {
  enabledSwipeLeft: boolean;
  enabledSwipeRight: boolean;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

export const useSwipe = ({ enabledSwipeLeft = false, enabledSwipeRight = false, wrapperRef }: UseSwipeProps) => {
  const [isSwipePanelOpen, setIsSwipePanelOpen] = useState({
    left: false,
    right: false,
  });

  const swipeStateXRef = useRef<SwipeState>({
    startX: 0,
    endX: 0,
  });

  function handleTouchStart(e: React.TouchEvent) {
    swipeStateXRef.current.startX = e.targetTouches[0].pageX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    swipeStateXRef.current.endX = e.targetTouches[0].pageX;
  }

  function handleTouchEnd() {
    if (!swipeStateXRef.current.endX) return;

    const offsetX = swipeStateXRef.current.endX - swipeStateXRef.current.startX;

    if (offsetX > 0) {
      if (isSwipePanelOpen.left) {
        setIsSwipePanelOpen({ left: false, right: false });
      } else {
        setIsSwipePanelOpen({ left: false, right: true });
      }
      swipeStateXRef.current.startX = 0;
      swipeStateXRef.current.endX = 0;
    }
    if (offsetX < 0) {
      if (isSwipePanelOpen.right) {
        setIsSwipePanelOpen({ left: false, right: false });
      } else {
        setIsSwipePanelOpen({ left: true, right: false });
      }
      swipeStateXRef.current.startX = 0;
      swipeStateXRef.current.endX = 0;
    }
  }

  function preventOutsideClickHandler(event: React.MouseEvent) {
    if (isSwipePanelOpen) {
      event.stopPropagation();
      event.preventDefault();
      setIsSwipePanelOpen({ left: false, right: false });
    }
  }

  useEffect(() => {
    const handleTouchStartOutside = (event: Event) => {
      if (!isSwipePanelOpen.left && !isSwipePanelOpen.right) return;
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsSwipePanelOpen({ left: false, right: false });
      }
    };

    document.addEventListener('touchstart', handleTouchStartOutside, true);
    return () => {
      document.removeEventListener('touchstart', handleTouchStartOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSwipePanelOpen]);

  return enabledSwipeLeft || enabledSwipeRight
    ? {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        wrapperRef,
        preventOutsideClickHandler,
        isSwipePanelOpen,
      }
    : {};
};
