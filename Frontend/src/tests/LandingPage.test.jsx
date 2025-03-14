import { render, screen } from '@testing-library/react';
import { describe, it, expect, test} from 'vitest';
import LandingPage from '../Pages/LandingPage';

test("renders LandingPage without crashing", () => {
    render(<LandingPage />);
    
    expect(screen.getByAltText("small-logo")).not.toBeNull();
});
test("renders all landing page sections", () => {
    render(<LandingPage />);
    expect(screen.findByText(/how to play/i)).not.toBeNull();
    expect(screen.findByText(/daniel/i)).not.toBeNull();
});