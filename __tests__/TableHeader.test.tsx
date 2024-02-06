import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TableHeader from '../src/components/TableHeader';
import { describe, it, expect } from 'vitest';

describe('TableHeader Component', () => {
  it('renders TableHeader label and button', async () => {
    const mockData = {
      label: 'Test Label',
    };
    render(<TableHeader data={mockData} />);

    // Test rendering of initial label
    const label = await screen.getByText('Test Label');
    expect(label).toBeTruthy();
  });

  it('Renders Table Menu button and expands Table Menu when clicked', async () => {
    const mockData = {
      label: 'Test Label',
    };
    render(<TableHeader data={mockData} />);

    // Test clicking more button
    const buttons = await screen.getAllByLabelText('expandTableMenu');
    fireEvent.click(buttons[0]);

    const edit = await screen.getByText('Edit Table Name');
    expect(edit).toBeTruthy();
    const add = await screen.getByText('Add Column');
    expect(add).toBeTruthy();
    const deleteBtn = await screen.getByText('Delete Table');
    expect(deleteBtn).toBeTruthy();
  });

  it('Replaces label with text field when edit table is selected and removes text box after edit is canceled', async () => {
    const mockData = {
      label: 'Test Label',
    };
    render(<TableHeader data={mockData} />);

    // Clicking expand button
    const buttons = await screen.getAllByLabelText('expandTableMenu');
    fireEvent.click(buttons[0]);

    const edit = await screen.getByText('Edit Table Name');
    fireEvent.click(edit);

    expect(screen.getByRole('textbox')).toBeTruthy();

    const cancel = await screen.getAllByLabelText('cancel');
    fireEvent.click(cancel[0]);

    const label = await screen.getAllByText('Test Label');
    expect(label).toBeTruthy();
  });
});
