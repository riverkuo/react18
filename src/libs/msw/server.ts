import { foodMswHandler } from '@/service/food/msw/handler';
import { setupServer } from 'msw/node';

/** this is for node(testing) */
export const server = setupServer(
  /** add all handlers here */
  ...foodMswHandler
);
