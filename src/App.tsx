import { Theme } from '@ant-design/react-native/lib/style';
import { AppLoading, Font } from 'expo';
import { configure } from 'mobx';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './screens/Home';
import stores from './store';

const AppNavigator = createStackNavigator(
	{
		Home: { screen: Home }
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#1F90E6'
			},
			headerTintColor: '#FFF',
			headerTitleStyle: {
				fontWeight: 'normal'
			}
		}
	}
);

const AppContainer = createAppContainer(AppNavigator);

interface State {
	currentTheme?: Partial<Theme>;
	isReady: boolean;
	theme?: Partial<Theme>;
}

// MobX: Enforce strict mode
configure({ enforceActions: 'observed' });

@observer
class App extends React.Component<{}, State> {
	public state: State = {
		currentTheme: undefined,
		isReady: false,
		theme: undefined
	};

	private changeTheme = (theme?: Partial<Theme>, currentTheme?: Partial<Theme>) => {
		this.setState({ theme, currentTheme });
	};

	public async componentDidMount() {
		await Font.loadAsync(
			'antoutline',
			// tslint:disable-next-line
			require('@ant-design/icons-react-native/fonts/antoutline.ttf')
		);

		await Font.loadAsync(
			'antfill',
			// tslint:disable-next-line
			require('@ant-design/icons-react-native/fonts/antfill.ttf')
		);
		this.setState({ isReady: true });
	}

	public render() {
		const { theme, currentTheme, isReady } = this.state;
		if (!isReady) {
			return <AppLoading />;
		}

		return (
			<Provider {...stores} theme={theme}>
				<AppContainer screenProps={{ changeTheme: this.changeTheme, currentTheme }} />
			</Provider>
		);
	}
}

export default App;
