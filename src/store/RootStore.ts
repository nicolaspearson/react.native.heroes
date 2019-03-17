import { HeroApi } from '../api/HeroApi';
import { HeroStore } from './HeroStore';

export class RootStore {
	public heroApi: HeroApi;
	public heroStore: HeroStore;

	constructor() {
		// API Classes
		this.heroApi = new HeroApi();

		// Store Classes
		this.heroStore = new HeroStore(this);
	}
}
