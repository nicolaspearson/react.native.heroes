import { action, observable } from 'mobx';

import { RootStore } from './RootStore';

// This base class should only be extended by stores that implement API calls
export abstract class BaseStore<T> {
	public rootStore: RootStore;

	@observable
	public data?: T;

	@observable
	public dataList: T[] = [];

	@observable
	public errors?: any;

	@observable
	public loading: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.initState();
	}

	@action
	public initState(keepList?: boolean) {
		this.data = undefined;
		if (!keepList) {
			this.dataList = [];
		}
		this.errors = undefined;
		this.loading = false;
	}

	@action
	public handleResponse(res: any, isList?: boolean, mutateList?: (res: T) => void) {
		console.log('handleResponse', res);
		this.loading = false;
		if (res) {
			if (res.error) {
				this.errors = res;
			} else {
				if (isList) {
					// Set the list
					this.dataList = res;
				} else if (mutateList) {
					// Mutate the list
					mutateList(res);
				}
				// Set the data
				this.data = res;
			}
		} else {
			this.errors = 'An unknown error occurred';
		}
	}

	@action
	public handleError(error: any) {
		console.log('handleError', error);
		this.errors = error;
		this.loading = false;
	}
}
