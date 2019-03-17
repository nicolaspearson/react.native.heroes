import { Button, InputItem, List } from '@ant-design/react-native';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { Hero } from '../../models/Hero';
import { HeroStore } from '../../store/HeroStore';

const styles = StyleSheet.create({
	scrollContainer: {
		display: 'flex',
		flex: 1,
		backgroundColor: '#f5f5f5'
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
	}
});

export interface HeroScreenProps {
	heroStore?: HeroStore;
	navigation: NavigationScreenProp<NavigationState>;
}

interface State {
	hero?: Hero;
}

@inject('heroStore')
@observer
class HeroScreen extends React.Component<HeroScreenProps, State> {
	public static navigationOptions = {
		title: 'Hero'
	};

	public state: State = {
		hero: undefined
	};

	public componentDidMount() {
		const hero = this.props.navigation.getParam('hero', {
			name: '',
			identity: '',
			hometown: '',
			age: 0
		});
		this.setState({ hero });
	}

	private validateHero(hero: Hero) {
		return hero.name && hero.identity && hero.hometown && hero.age && hero.age > 0;
	}

	private createHero = async (hero: Hero) => {
		if (this.props.heroStore && this.validateHero(hero)) {
			await this.props.heroStore.createHero(hero);
			this.setState({ hero: this.props.heroStore.data });
			this.props.navigation.goBack();
		}
	};

	private updateHero = async (hero: Hero) => {
		if (this.props.heroStore && this.validateHero(hero) && hero.id) {
			await this.props.heroStore.updateHero(hero.id, hero);
			this.setState({ hero: this.props.heroStore.data });
			this.props.navigation.goBack();
		}
	};

	private deleteHero = async (hero: Hero) => {
		if (this.props.heroStore && hero.id) {
			await this.props.heroStore.deleteHero(hero.id);
			this.props.navigation.goBack();
		}
	};

	private handleSavePress = async () => {
		if (this.state.hero) {
			await this.createHero(this.state.hero);
		}
	};

	private handleUpdatePress = async () => {
		if (this.state.hero) {
			await this.updateHero(this.state.hero);
		}
	};

	private handleDeletePress = async () => {
		if (this.state.hero) {
			await this.deleteHero(this.state.hero);
		}
	};

	public render() {
		const isCreate: boolean =
			this.state.hero && this.state.hero.id && this.state.hero.id > 0 ? false : true;
		return (
			<ScrollView
				style={styles.scrollContainer}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
				<List renderHeader={'Edit'}>
					<InputItem
						clear={true}
						value={this.state.hero && this.state.hero.name ? this.state.hero.name : ''}
						onChange={value => {
							this.setState({
								hero: { ...this.state.hero, name: value }
							});
						}}
						placeholder="text"
					>
						Name
					</InputItem>
					<InputItem
						clear={true}
						value={this.state.hero && this.state.hero.identity ? this.state.hero.identity : ''}
						onChange={value => {
							this.setState({
								hero: { ...this.state.hero, identity: value }
							});
						}}
						placeholder="text"
					>
						Identity
					</InputItem>
					<InputItem
						clear={true}
						value={this.state.hero && this.state.hero.hometown ? this.state.hero.hometown : ''}
						onChange={value => {
							this.setState({
								hero: { ...this.state.hero, hometown: value }
							});
						}}
						placeholder="text"
					>
						Hometown
					</InputItem>
					<InputItem
						clear={true}
						type="number"
						value={this.state.hero && this.state.hero.age ? String(this.state.hero.age) : ''}
						onChange={value => {
							this.setState({
								hero: { ...this.state.hero, age: Number(value) }
							});
						}}
						placeholder="age"
					>
						Age
					</InputItem>
				</List>
				{isCreate ? (
					<View style={styles.buttonContainer}>
						<Button style={styles.button} onPress={this.handleSavePress} type="primary">
							Save
						</Button>
					</View>
				) : (
					<View style={styles.buttonContainer}>
						<Button style={styles.button} onPress={this.handleUpdatePress} type="primary">
							Update
						</Button>
						<Button style={styles.button} onPress={this.handleDeletePress} type="warning">
							Delete
						</Button>
					</View>
				)}
			</ScrollView>
		);
	}
}

export default HeroScreen;
