import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TurboNode, { TurboNodeData } from '../src/components/TurboNode'; 

describe('TurboNode Component', () => {
  // tests normal turbo node table header
  it('renders TurboNode component with TableHeader when label is not "Add New Table"', () => {
    const mockData: TurboNodeData = {
      label: 'Test Label',
    };

    const { getByText } = render(<TurboNode data={mockData} />);
    const tableHeaderElement = getByText('Test Label');
    expect(tableHeaderElement).toBeTruthy();
  });

  // tests "add table" table header
  it('renders TurboNode component with AddTable when label is "Add New Table"', () => {
    const addTableData: TurboNodeData = {
      label: 'Add New Table',
    };

    const { getByText } = render(<TurboNode data={addTableData} />);
    const addTableElement = getByText('Add New Table');
    expect(addTableElement).toBeTruthy();
  });
});