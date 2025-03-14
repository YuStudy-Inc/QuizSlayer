import {render, screen } from '@testing-library/react';
import {describe, it, expect, test} from 'vitest';
import LandingPage from '../Pages/LandingPage';

test('renders landing page', () => {
    render (<LandingPage/>)
    const text = screen.getByText('Strike First. Strike Hard. No Mercy')
    expect(text).not.toBeNull();
});