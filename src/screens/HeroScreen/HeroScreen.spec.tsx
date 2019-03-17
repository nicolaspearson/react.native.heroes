import * as React from 'react';
import * as renderer from 'react-test-renderer';

import HeroScreen from './HeroScreen';

it('renders without crashing', () => {
	const rendered = renderer.create(<HeroScreen />).toJSON();
	expect(rendered).toBeTruthy();
});
