import { useEffect, useRef, useState } from 'react';
import { FooterComponent, OnReachEnd } from '../../types';
import { IntersectionObserverService } from './IntersectionObserverService';

interface ListFooterProps {
  onReachEnd?: OnReachEnd;
  footerComponent?: FooterComponent;
  containerRef?: React.RefObject<HTMLDivElement> | null;
}

export const ListFooter: React.FC<ListFooterProps> = ({ onReachEnd, footerComponent, containerRef }) => {
  const [isEndIntersecting, setIsEndIntersecting] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const constructor = {
      setIsEndIntersecting,
      target: endRef.current,
      onReachEnd,
      options: {
        root: containerRef?.current,
        threshold: 0.1,
      },
    };

    const observer = new IntersectionObserverService(constructor);

    observer.observe();

    return () => {
      observer.unobserve();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {footerComponent?.({ isEndIntersecting })}
      <div ref={endRef} style={{ minHeight: '1px' }} />
    </div>
  );
};
