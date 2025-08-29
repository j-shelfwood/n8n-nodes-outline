import {
	IExecuteFunctions,
	IDataObject,
	IHttpRequestMethods,
	IRequestOptions,
	NodeApiError,
	JsonObject,
	IHookFunctions,
} from 'n8n-workflow';

/**
 * Make an API request to Outline
 */
export async function outlineApiRequest(
	this: IExecuteFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {}
): Promise<any> {
	const credentials = await this.getCredentials('outlineApi');

	const options: IRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.baseUrl}/api${endpoint}`,
		headers: {
			Authorization: `Bearer ${credentials.apiKey}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		json: true,
	};

	try {
		const response = await this.helpers.request(options);

		if (response.ok === false) {
			throw new NodeApiError(this.getNode(), response as JsonObject);
		}

		return response.data || response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
