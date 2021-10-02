import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { StaticRouter } from 'react-router-dom';
import Weather from '../components/Weather';


afterEach(cleanup)

test('initial conditions', () => {
	render(
		<StaticRouter>
			<Weather />
		</StaticRouter>
	);

	const comboInputField = screen.getByRole('textbox', { name: /Type city or capital names/i });

	// i expect the textfield not to be focused when page loads
	expect(comboInputField).not.toHaveFocus();
})



// find an element with a role textbox and text Type city or capital names and focus it after user tabs
test('when user tabs, the body element and combobox textbox input should have focus', () => {
  render(
    <StaticRouter>
      <Weather/>
    </StaticRouter>
  )
    // select the element
  const comboInputField = screen.getByRole('textbox', { name: /Type city or capital names/i });

  // no focus
  expect(document.body).toHaveFocus()
  // i press tab
  userEvent.tab()

  // after pressing tab, it has focus
  expect(comboInputField).toHaveFocus()
  // press tab again
  userEvent.tab()

  // the cycle goes back to the body element
    expect(document.body).toHaveFocus();
	  userEvent.tab();
})



test('user types in textfield', () => {
  render(
		<StaticRouter>
			<Weather />
		</StaticRouter>
  );

  const comboInputField = screen.getByRole('textbox', { name: /Type city or capital names/i });

  userEvent.type(comboInputField, 'Hello,World!')
  expect(comboInputField).toHaveValue('Hello,World!')


})

