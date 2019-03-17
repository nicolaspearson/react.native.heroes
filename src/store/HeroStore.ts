import { BaseStore } from './BaseStore';
import { RootStore } from './RootStore';

import { Hero } from '../models/Hero';

export class HeroStore extends BaseStore<Hero> {
	public rootStore: RootStore;

	constructor(rootStore: RootStore) {
		super(rootStore);
		this.rootStore = rootStore;
	}
}
