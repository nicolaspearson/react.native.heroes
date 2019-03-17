import { RootStore } from './RootStore';

const rootStore = new RootStore();

export default {
	heroStore: rootStore.heroStore,
	store: rootStore
};
