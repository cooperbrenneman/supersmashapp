import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Super Smash Ultimate Tracker App/i);
  expect(linkElement).toBeInTheDocument();
});
