import { Hero } from '../models/Hero';
import ApiUtils from '../utils/ApiUtils';

export class HeroApi {
	public headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json'
	});

	public get = (id: number): Promise<Response> => {
		return ApiUtils.execute(this.headers, 'GET', ApiUtils.getApiEndpoint(), `/hero?id=${id}`);
	};

	public getAll = (): Promise<Response> => {
		return ApiUtils.execute(this.headers, 'GET', ApiUtils.getApiEndpoint(), '/heroes');
	};

	public create = (hero: Hero): Promise<Response> => {
		return ApiUtils.execute(this.headers, 'POST', ApiUtils.getApiEndpoint(), '/hero', hero);
	};

	public update = (id: number, hero: Hero): Promise<Response> => {
		return ApiUtils.execute(this.headers, 'PUT', ApiUtils.getApiEndpoint(), `/hero/${id}`);
	};

	public delete = (id: number): Promise<Response> => {
		return ApiUtils.execute(this.headers, 'DELETE', ApiUtils.getApiEndpoint(), `/hero/${id}`);
	};
}
