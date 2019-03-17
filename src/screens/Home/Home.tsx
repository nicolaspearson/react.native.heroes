import { Button } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Hero } from '../../models/Hero';
import { HeroStore } from '../../store/HeroStore';

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
	heroStore?: HeroStore;
}

interface State {
	heroes: Hero[];
}

@inject('heroStore')
@observer
class Home extends React.Component<HomeProps, State> {
	public async componentDidMount() {
		if (this.props.heroStore) {
			await this.props.heroStore.getHeroes();
			console.log(this.props.heroStore.dataList);
			this.setState({ heroes: this.props.heroStore.dataList });
		}
	}

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
