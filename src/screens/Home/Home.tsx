import { Button, List } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Hero } from '../../models/Hero';
import { HeroStore } from '../../store/HeroStore';

const Item = List.Item;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
		backgroundColor: '#fff'
	},

	emptyTextContainer: {
		marginTop: 80
	},

	emptyText: {
		textAlign: 'center',
		paddingLeft: 40,
		paddingRight: 40
	},

	buttonContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	},

	button: {
		marginLeft: 10,
		marginRight: 10
	},

	scrollContainer: {
		display: 'flex',
		flex: 1,
		backgroundColor: '#f5f5f5'
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
	public static navigationOptions = {
		title: 'Home'
	};

	public state: State = {
		heroes: []
	};

	public async componentDidMount() {
		await this.loadData();
	}

	private loadData = async () => {
		if (this.props.heroStore) {
			await this.props.heroStore.getHeroes();
			this.setState({ heroes: this.props.heroStore.dataList });
		}
	};

	private handleReloadPress = async () => {
		await this.loadData();
	};

	private renderHeroItems = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		for (const hero of this.state.heroes) {
			items.push(
				<Item key={hero.id} arrow="horizontal">
					{hero.name}
				</Item>
			);
		}
		return items;
	};

	private renderHeroList = (): JSX.Element => {
		return (
			<ScrollView
				style={styles.scrollContainer}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Heroes'}>{this.renderHeroItems()}</List>
			</ScrollView>
		);
	};

	public render() {
		const hasHeroes: boolean = this.state.heroes.length > 0;
		if (hasHeroes) {
			return this.renderHeroList();
		}
		return (
			<View style={styles.container}>
				<View style={styles.emptyTextContainer}>
					<Text style={styles.emptyText}>
						No heroes found, you can try to reload the data, or create a new hero!
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<Button style={styles.button} onPress={this.handleReloadPress}>
						Reload
					</Button>
					<Button style={styles.button} type="primary">
						Create
					</Button>
				</View>
			</View>
		);
	}
}

export default Home;
