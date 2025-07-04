import { foodMswHandler } from '@/service/food/msw/handler';
import { delay } from '@/utils/mock-data-utils';
import { http } from 'msw';
import { setupWorker } from 'msw/browser';

/** this is for brower */
export const worker = setupWorker(
  /** set 2 seconds delay */
  http.all('*', async () => {
    await delay(2);
  }),

  /** add all handlers here */
  ...foodMswHandler
);
