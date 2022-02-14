import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const h1 = screen.getByText(/A* Star: a path finder algorithm</i);
  expect(h1).toBeInTheDocument();
});
