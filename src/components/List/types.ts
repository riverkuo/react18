import { ReactNode } from 'react';

export type FooterComponent = ({ isEndIntersecting }: { isEndIntersecting: boolean }) => ReactNode;

export type OnReachEnd = () => Promise<unknown>;
