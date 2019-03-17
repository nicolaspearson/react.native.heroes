import { Button } from '@ant-design/react-native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center'
	},

	button: {
		marginTop: 20
	}
});

export interface HomeProps {
	// Empty
}

interface State {
	// Empty
}

class Home extends React.Component<HomeProps, State> {
	public render() {
		return (
			<View style={styles.container}>
				<Text>Open up Home.tsx to start working on the home screen!</Text>
				<Button style={styles.button} type="primary">
					Press Me!
				</Button>
			</View>
		);
	}
}

export default Home;
