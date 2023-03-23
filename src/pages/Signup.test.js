import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import React from 'react';

test('renders learn react link', () => {
  render(<Signup />);
  const linkElement = screen.getByLabelText('Email');
  expect(linkElement).toBeInTheDocument();
});



