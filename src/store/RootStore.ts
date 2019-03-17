import { HeroStore } from './HeroStore';

export class RootStore {
	public heroStore: HeroStore;

	constructor() {
		this.heroStore = new HeroStore(this);
	}
}
