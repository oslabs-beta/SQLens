import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TurboNode, { TurboNodeData } from '../src/components/TurboNode';

describe('TurboNode Component',  () => {
  // tests normal turbo node table header
  it('renders TurboNode component with TableHeader when label is not "Add New Table"', async () => {
    const mockData: TurboNodeData = {
      label: 'Test Label',
    };

    render(<TurboNode data={mockData} type={''} id={''} selected={false} zIndex={0} isConnectable={false} xPos={0} yPos={0} dragging={false} />);
    const label = await screen.getByText('Test Label');
    expect(label).toBeTruthy();
  });

  // tests "add table" table header
  it('renders TurboNode component with AddTable when label is "Add New Table"', async () => {
    const addTableData: TurboNodeData = {
      label: 'Add New Table',
    };

    render(<TurboNode data={addTableData} type={''} id={''} selected={false} zIndex={0} isConnectable={false} xPos={0} yPos={0} dragging={false} />);
    const label = await screen.getByText('Add New Table');
    expect(label).toBeTruthy();
  });
});

  // Alternative testing method
    // const { getByText } = render(<TurboNode data={mockData} />);
    // const tableHeaderElement = getByText('Test Label');
    // expect(tableHeaderElement).toBeTruthy();
