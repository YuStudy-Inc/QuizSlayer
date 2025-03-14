import { render, screen } from '@testing-library/react';
import { describe, it, expect, test} from 'vitest';
import Login from '../Pages/Login';

test('renders the login heading', () => {
  render(<Login />);  // Renders the Login component
  const heading = screen.getByText(/Hi/i); // Find the heading element
  expect(heading).not.toBeNull();  // Ensures the heading is in the DOM
});
