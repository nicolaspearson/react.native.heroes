import * as React from 'react';
import * as renderer from 'react-test-renderer';

import HomeScreen from './HomeScreen';

it('renders without crashing', () => {
	const rendered = renderer.create(<HomeScreen />).toJSON();
	expect(rendered).toBeTruthy();
});
