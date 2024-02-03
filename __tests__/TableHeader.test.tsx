import React from 'react';
import { render } from '@testing-library/react';
import TableHeader from '../src/components/TableHeader';
import { describe, it, expect } from 'vitest';
// import { getByText } from '@testing-library/react';
// import { mount } from 'vitest';

describe('TableHeader Component', async () => {

  it('renders TableHeader label', async () => {
    const mockData = {
        label: 'Test Label',
    };
    const { getByText } = render(<TableHeader data={mockData} />);

    // Test rendering of initial label
    const tableHeaderElement = getByText('Test Label');
    expect(tableHeaderElement).toBeTruthy();
})

  // Test editing functionality
  it('has editing functionality', async () => {
    const mockData = {
        label: 'mockData',
    };

    render(<TableHeader data={mockData} />);
    // await screen.setData({ isEditing: true });
    // const inputElement = wrapper.find('input');
    // expect(inputElement.exists()).toBe(true);

//   // Test handleEditSubmit function
//   await inputElement.setValue('NewTable');
//   await wrapper.find('[aria-label="check"]').trigger('click');
//   expect(console.log).toHaveBeenCalledWith('NewTable', 'TestTable');
})
});