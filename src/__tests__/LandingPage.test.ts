import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LandingPage from './LandingPage';

describe('LandingPage Component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LandingPage />);
    
    // Check if site title text is rendered
    expect(getByText('SQLens')).toBeInTheDocument();
    
    // Check if URI input field is rendered
    expect(getByPlaceholderText('Enter URI here')).toBeInTheDocument();
  });

  test('form submission triggers handleSubmit function', async () => {
    const fetchTablesMock = jest.fn();
    const navigateMock = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<LandingPage />);
    const input = getByPlaceholderText('Enter URI here') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'submit' });

    // Mocking fetch function
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Database connection updated successfully' }),
      })
    );

    fireEvent.change(input, { target: { value: 'testURI' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchTablesMock).toHaveBeenCalled(); // Assuming fetchTables is called after successful form submission
      expect(navigateMock).toHaveBeenCalledWith('/flow'); // Assuming navigation occurs after successful form submission
    });
  });
});

