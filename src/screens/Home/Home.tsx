import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center'
	}
});

class Home extends React.Component {
	public render() {
		return (
			<View style={styles.container}>
				<Text>Open up Home.tsx to start working on the home screen!</Text>
			</View>
		);
	}
}

export default Home;
