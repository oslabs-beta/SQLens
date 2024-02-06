import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../src/components/NavBar';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar Component', () => {
    //renders navbar nested in memory router since navbar uses useNavigate
    beforeEach(() => {
      render(<MemoryRouter><NavBar/></MemoryRouter>);
    });
    it('renders NavBar Component with button and logo', async () => {
      const logo = await screen.getByText('SQL');
      expect(logo).toBeTruthy();

      const menu = await screen.getByLabelText('open drawer');
      expect(menu).toBeTruthy();
    });
    it('renders NavBar Menu when clicked', async () => {
        fireEvent.click(screen.getByLabelText('open drawer'));
        expect(screen.getByText('Download Migration File')).toBeTruthy();
        expect(screen.getByText('Logout')).toBeTruthy();
    })
})
