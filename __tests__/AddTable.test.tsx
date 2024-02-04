import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import AddTable from '../src/components/AddTable';
import * as store from '../src/store';


describe('AddTable Component', () => {
  // Mock setup for store
  beforeEach(() => {
    // Reset mocks and set up new implementations
    store.useStore = vi.fn(() => ({
      fetchAndUpdateTableDetails: vi.fn(),
      tables: [],
      setTables: vi.fn(),
    }));
  });

  it('renders correctly with initial label', () => {
    const testData = { label: 'Add New Table' };
    render(<AddTable data={testData} />);
    expect(screen.getByText('Add New Table')).toBeTruthy();
  });

  it('enters editing mode on edit button click', async () => {
    const testData = { label: 'Editable Table' };
    render(<AddTable data={testData} />);
    fireEvent.click(screen.getByLabelText('edit'));
    expect(screen.getByRole('textbox')).toBeTruthy();
  });
  

  it('cancels editing mode and reverts changes on cancel button click', async () => {
    const testData = { label: 'Editable Table' };
    render(<AddTable data={testData} />);
    fireEvent.click(screen.getByLabelText('edit'));
    fireEvent.click(screen.getByLabelText('cancel'));
    expect(screen.queryByRole('textbox')).not.toBeTruthy();
    // Since getByText fails if the element is not found, using queryByText to check absence
    expect(screen.queryByText('Editable Table')).toBeTruthy();
  });

  // Add more tests to cover the check (confirm) button functionality and its interaction with the mock fetch
});
