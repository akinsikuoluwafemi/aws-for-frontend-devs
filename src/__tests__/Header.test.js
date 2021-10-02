import { render, screen } from '@testing-library/react';
import { StaticRouter} from 'react-router-dom';
import Header from '../components/Header';

// find an element with the role of link and text of "home"
test('renders home link', () => {
  render(
		<StaticRouter>
			<Header />
		</StaticRouter>
  );
  const linkElement = screen.getByRole('link', { name: /home/i });
  expect(linkElement).toBeInTheDocument();
})

// find an element with the role of link and text of "city capitals"
test('renders city capitals link', () => {
  render(
    <StaticRouter>
      <Header />
    </StaticRouter>
  );
  const linkElement = screen.getByRole('link', { name: /city capitals/i });
  expect(linkElement).toBeInTheDocument();
})