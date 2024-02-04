import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DeleteColumnButton from '../src/components/DeleteColumnButton';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: { deleteColumn: true } }),
  })) as any;

// Clear mock before each test
beforeEach(() => {
    (fetch as any).mockClear();
  });

  const consoleSpy = vi.spyOn(console, 'log');


  describe('Delete Column Operation', () => {
    it('deletes the column node from its parent table node', async () => {
      render(
        <MockedProvider>
          <DeleteColumnButton data={{ label: 'column1', parent: 'Table1' }} />
        </MockedProvider>
      );
  
      // Trigger the delete operation
      const deleteButton = screen.getByRole('button', { name: 'delete' });
      fireEvent.click(deleteButton);
  
      // Wait for the confirmation dialog to appear
      await waitFor(() => screen.getByRole('dialog'));
  
      // Confirm the deletion
      const yesButton = screen.getByRole('button', { name: /yes/i });
      fireEvent.click(yesButton);
  
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(expect.anything());
        expect(consoleSpy).toHaveBeenNthCalledWith(1, expect.objectContaining({ deleteColumn: true }));
      });

      consoleSpy.mockRestore();

      await waitFor(() => {
        expect(screen.queryByText('column1')).toBeNull();
      });
    });
  });
