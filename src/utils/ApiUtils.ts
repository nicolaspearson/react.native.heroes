import { API_ENDPOINT } from 'react-native-dotenv';

export default class ApiUtils {
	public static localDomain?: string;
	public static orchestraApiEndpoint?: string;
	public static orchestraApiConnector?: string;
	public static localIpAddress?: string;

	public static getApiEndpoint() {
		return API_ENDPOINT || '';
	}

	public static async execute(
		headers: Headers,
		method: string,
		url: string,
		path: string,
		data?: any,
		resOnly?: boolean
	): Promise<Response> {
		let resStatus: number = 0;
		const reqUrl: string = url + path;
		return fetch(reqUrl, {
			cache: 'default',
			method,
			headers,
			body: JSON.stringify(data)
		})
			.then(res => {
				// Set the status code from the response
				resStatus = res.status;

				if (resOnly) {
					return res;
				}

				if (resStatus === 204 || resStatus === 500) {
					return '{}';
				}

				return res.json();
			})
			.then(res => {
				switch (resStatus) {
					case 500:
						console.log('internal-server-error');
						throw Error('500 Internal Server Error: Please try again!');
				}
				return res;
			})
			.catch(error => {
				if (error instanceof Error) {
					console.log(error.message);
					return Promise.reject(error.message);
				}
				return Promise.reject(error);
			});
	}
}
