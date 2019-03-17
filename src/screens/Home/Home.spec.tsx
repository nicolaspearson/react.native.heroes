import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Home from './Home';

it('renders without crashing', () => {
	const rendered = renderer.create(<Home />).toJSON();
	expect(rendered).toBeTruthy();
});
