import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestText from './TestText';
import React from 'react';

describe('App', () => {
  it('Vite to be in document', () => {
    render(<TestText />);
    expect(screen.getByText('TestText')).toBeTruthy();
  });
});
