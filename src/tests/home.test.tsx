import { Home } from '@/layout/home';
import { QueryClientProvider } from '@/libs/store/query-client/provider';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Home component', () => {
  test('should get data form api', async () => {
    render(
      <QueryClientProvider>
        <Home />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText('無資料')).not.toBeInTheDocument();
      // expect(screen.queryByText('無資料')).toBeInTheDocument();
    });
  });
});
