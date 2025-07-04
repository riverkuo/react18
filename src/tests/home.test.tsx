import { QueryClientProvider } from '@/libs/store/query-client/provider';
import Supabase from '@/pages/Supabase';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Supabase component', () => {
  test('should get data form api', async () => {
    render(
      <QueryClientProvider>
        <Supabase />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText('無資料')).not.toBeInTheDocument();
      // expect(screen.queryByText('無資料')).toBeInTheDocument();
    });
  });
});
