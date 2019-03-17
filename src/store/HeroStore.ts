import { flow } from 'mobx';

import { Hero } from '../models/Hero';
import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';

export class HeroStore extends BaseStore<Hero> {
	public rootStore: RootStore;

	constructor(rootStore: RootStore) {
		super(rootStore);
		this.rootStore = rootStore;
	}

	private mutateList = (res: Hero) => {
		if (res) {
			const index = this.dataList.findIndex(
				item =>
					(res.name !== undefined && res.name === item.name) ||
					(res.id !== undefined && res.id === item.id)
			);
			if (index > -1) {
				this.dataList.splice(index, 1, {
					...res
				});
			} else {
				this.dataList = [...this.dataList, res];
			}
		}
	};

	private deleteFromList = (res: Hero) => {
		if (res) {
			const index = this.dataList.findIndex(item => res.name === item.name);
			if (index > -1) {
				this.dataList.splice(index, 1);
			}
		}
	};

	public getHero = flow(function*(this: HeroStore, heroId: number) {
		this.initState(true);
		this.loading = true;
		try {
			const res: Hero = yield this.rootStore.heroApi.get(heroId);
			this.handleResponse(res, false, this.mutateList);
		} catch (error) {
			this.handleError(error);
		}
	});

	public getHeroes = flow(function*(this: HeroStore) {
		this.initState();
		this.loading = true;
		try {
			const res: Hero[] = yield this.rootStore.heroApi.getAll();
			this.handleResponse(res, true);
		} catch (error) {
			this.handleError(error);
		}
	});

	public createHero = flow(function*(this: HeroStore, hero: Hero) {
		this.initState(true);
		this.loading = true;
		try {
			// Save the hero
			const res: Hero = yield this.rootStore.heroApi.create(hero);
			this.handleResponse(res, false, this.mutateList);
		} catch (error) {
			this.handleError(error);
		}
	});

	public updateHero = flow(function*(this: HeroStore, heroId: number, hero: Hero) {
		this.initState(true);
		this.loading = true;
		try {
			// Update the hero
			const res: Hero = yield this.rootStore.heroApi.update(heroId, hero);
			this.handleResponse(res, false, this.mutateList);
		} catch (error) {
			this.handleError(error);
		}
	});

	public deleteHero = flow(function*(this: HeroStore, heroId: number) {
		this.initState(true);
		this.loading = true;
		try {
			const res: Hero = yield this.rootStore.heroApi.delete(heroId);
			this.handleResponse(res, false, this.deleteFromList);
		} catch (error) {
			this.handleError(error);
		}
	});
}
