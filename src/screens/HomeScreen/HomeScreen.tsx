import { Button, List } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

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

	addButton: {
		color: '#FFF',
		fontSize: 24,
		paddingLeft: 20,
		paddingRight: 20
	},

	scrollContainer: {
		display: 'flex',
		flex: 1,
		backgroundColor: '#f5f5f5'
	}
});

export interface HomeScreenProps {
	heroStore?: HeroStore;
	navigation: NavigationScreenProp<NavigationState>;
}

interface State {
	heroes: Hero[];
}

@inject('heroStore')
@observer
class HomeScreen extends React.Component<HomeScreenProps, State> {
	public static navigationOptions = ({
		navigation
	}: {
		navigation: NavigationScreenProp<NavigationState>;
	}) => {
		return {
			headerTitle: 'Home',
			headerRight: (
				<Text style={styles.addButton} onPress={() => navigation.navigate('Hero', {})}>
					+
				</Text>
			)
		};
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
		}
	};

	private handleReloadPress = async () => {
		await this.loadData();
	};

	private handleHeroPress = (hero: Hero) => {
		this.props.navigation.navigate('Hero', { hero });
	};

	private renderHeroItems = (): JSX.Element[] => {
		const items: JSX.Element[] = [];
		for (const hero of this.state.heroes) {
			items.push(
				<Item key={hero.id} arrow="horizontal" onPress={() => this.handleHeroPress(hero)}>
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
		const loading: boolean = this.props.heroStore && this.props.heroStore.loading ? true : false;
		if (!loading && this.props.heroStore) {
			this.setState({ heroes: this.props.heroStore.dataList });
		}
		if (hasHeroes) {
			return this.renderHeroList();
		} else if (!loading) {
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
		return <View style={styles.container} />;
	}
}

export default HomeScreen;
